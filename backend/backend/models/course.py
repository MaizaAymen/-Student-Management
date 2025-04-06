from bson import ObjectId
from pydantic import BaseModel
from typing import Optional

class CourseSchema(BaseModel):
    _id: Optional[str] = None  # Store ObjectId as a string
    name: str
    description: Optional[str] = None
    price: Optional[float] = None

    class Config:
        json_encoders = {ObjectId: str}
        orm_mode = True
