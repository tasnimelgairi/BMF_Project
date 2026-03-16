from pydantic import BaseModel, EmailStr

class GestionnaireCreate(BaseModel):
    nom: str
    prenom: str
    email: EmailStr
    mot_de_passe: str
    role: str

class GestionnaireLogin(BaseModel):
    email: EmailStr
    mot_de_passe: str