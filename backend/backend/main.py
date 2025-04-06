from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import EtudiantSchema
from database.database import etudiants_collection  # Ensure you have MongoDB connection here
from bson import ObjectId
from models.course import CourseSchema
from database.database import courses_collection

# Create FastAPI app
app = FastAPI()

# CORS middleware setup
origins = [
    "http://localhost:5173",  # React local dev server (remove trailing slash)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Route to add an etudiant
@app.post("/etudiants/", response_model=EtudiantSchema)
async def add_etudiant(etudiant: EtudiantSchema):
    # Create a dict from the schema to insert into the database
    etudiant_dict = etudiant.dict(exclude_unset=True)

    # Insert into the MongoDB
    result = await etudiants_collection.insert_one(etudiant_dict)

    # Add the generated _id to the returned schema
    if result.inserted_id:
        etudiant_dict["_id"] = str(result.inserted_id)  # Convert ObjectId to string
        return etudiant_dict

    raise HTTPException(status_code=400, detail="Failed to add student")
@app.get("/etudiants/", response_model=List[EtudiantSchema])
async def get_etudiants():
    # Fetch students from the database
    etudiants = []
    async for etudiant in etudiants_collection.find():
        etudiant["_id"] = str(etudiant["_id"])  # Convert ObjectId to string for consistency
        etudiants.append(etudiant)
    return etudiants

@app.get("/etudiants/count")
async def get_students_count():
    count = await etudiants_collection.count_documents({})
    return {"total_students": count}

@app.delete("/etudiants/{id}")
async def delete_etudiant(id: str):
    result = await etudiants_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"status": "success", "message": "Deleted successfully"}
    raise HTTPException(status_code=404, detail="Student not found")


@app.post("/courses/", response_model=CourseSchema)
async def add_course(course: CourseSchema):
    course_dict = course.dict(exclude_unset=True)
    result = await courses_collection.insert_one(course_dict)

    if result.inserted_id:
        course_dict["_id"] = str(result.inserted_id)  # Convert ObjectId to string
        return course_dict

    raise HTTPException(status_code=400, detail="Failed to add course")


@app.get("/courses/", response_model=List[CourseSchema])
async def get_courses():
    courses = []
    async for course in courses_collection.find():
        course["_id"] = str(course["_id"])  # Convert ObjectId to string
        courses.append(course)
    return courses
# Sample route for a message
@app.get("/")
async def root():
    return {"message": "Hello World"}
