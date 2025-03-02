from pydantic import BaseModel, EmailStr
from typing import Optional
from bson import ObjectId

class EtudiantSchema(BaseModel):
    _id: Optional[str] = None  # This will store the ObjectId as a string
    nom: str
    prenom: str
    speciality: Optional[str] = None  # Make speciality optional
    email: EmailStr
    age: Optional[int] = None

    class Config:
        # This ensures that we can serialize BSON ObjectId to string
        json_encoders = {
            ObjectId: str,
        }
        orm_mode = True  # Also allows compatibility with ORMs