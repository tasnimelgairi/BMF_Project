from fastapi.middleware.cors import CORSMiddleware
from app.api.upload import router as upload_router
from fastapi import FastAPI, HTTPException
import hashlib
from app.core.database import get_connection
from app.core.model import GestionnaireCreate, GestionnaireLogin

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload_router)

@app.get("/")
def read_root():
    return {"message": "Backend is running"}


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@app.on_event("startup")
def startup():
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS gestionnaire (
            gestionnaire_id INTEGER PRIMARY KEY,
            nom VARCHAR NOT NULL,
            prenom VARCHAR NOT NULL,
            email VARCHAR NOT NULL UNIQUE,
            mot_de_passe VARCHAR NOT NULL,
            role VARCHAR NOT NULL,
            actif BOOLEAN NOT NULL DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.close()

@app.post("/auth/register")
def register(data: GestionnaireCreate):
    conn = get_connection()

    existing = conn.execute(
        "SELECT * FROM gestionnaire WHERE email = ?",
        [data.email]
    ).fetchone()

    if existing:
        conn.close()
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    max_id = conn.execute(
        "SELECT COALESCE(MAX(gestionnaire_id), 0) + 1 FROM gestionnaire"
    ).fetchone()[0]

    conn.execute("""
        INSERT INTO gestionnaire
        (gestionnaire_id, nom, prenom, email, mot_de_passe, role, actif)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, [
        max_id,
        data.nom,
        data.prenom,
        data.email,
        hash_password(data.mot_de_passe),
        data.role,
        True
    ])

    conn.close()
    return {"message": "Gestionnaire créé avec succès"}

@app.post("/auth/login")
def login(data: GestionnaireLogin):
    conn = get_connection()

    user = conn.execute("""
        SELECT gestionnaire_id, nom, prenom, email, role, actif, mot_de_passe
        FROM gestionnaire
        WHERE email = ?
    """, [data.email]).fetchone()

    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")

    if not user[5]:
        raise HTTPException(status_code=403, detail="Compte inactif")

    hashed_input = hash_password(data.mot_de_passe)

    if user[6] != hashed_input:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")

    return {
        "message": "Connexion réussie",
        "user": {
            "gestionnaire_id": user[0],
            "nom": user[1],
            "prenom": user[2],
            "email": user[3],
            "role": user[4]
        }
    }