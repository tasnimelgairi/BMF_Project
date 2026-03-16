from pathlib import Path
import duckdb

db_path = Path("app/db/masterfile.duckdb").resolve()

print("Chemin absolu :", db_path)
print("Existe :", db_path.exists())
print("Dossier parent :", db_path.parent)
print("Contenu du dossier :", list(db_path.parent.iterdir()))

try:
    conn = duckdb.connect(str(db_path))
    print("Connexion réussie")
    print("Tables :", conn.execute("SHOW TABLES").fetchall())
    conn.close()
except Exception as e:
    print("Erreur :", e)