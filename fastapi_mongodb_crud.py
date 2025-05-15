from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
from dotenv import load_dotenv
from bson import ObjectId
import smtplib
import os

# Load .env file
load_dotenv()

# Load environment variables
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "portfolio"

# Initialize FastAPI
app = FastAPI()

# MongoDB Client
client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://bedardthomas.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email configuration
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
EMAIL_SENDER = os.getenv("EMAIL_SENDER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

# Contact Form Model
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.post("/contact")
async def contact_me(form: ContactForm):
    try:
        # Create email content
        msg = MIMEMultipart()
        msg["From"] = EMAIL_SENDER
        msg["To"] = EMAIL_SENDER  # You receive the email
        msg["Subject"] = f"New Contact Message from {form.name}"
        body = f"Name: {form.name}\nEmail: {form.email}\n\nMessage:\n{form.message}"
        msg.attach(MIMEText(body, "plain"))

        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()  # Enable TLS encryption
            server.login(EMAIL_SENDER, EMAIL_PASSWORD)
            server.sendmail(EMAIL_SENDER, EMAIL_SENDER, msg.as_string())

        return {"message": "Your message was sent successfully!"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send message: {str(e)}")

# Models
class Project(BaseModel):
    title: str
    description: str
    image_url: str
    project_url: str
    tech_stack: List[str]

class ProjectInDB(Project):
    id: str = Field(alias="_id")

class Education(BaseModel):
    institution: str
    degree: Optional[str]
    field_of_study: str
    start_date: datetime
    end_date: Optional[datetime]
    description: Optional[str]

class EducationInDB(Education):
    id: str = Field(alias="_id")

class Comment(BaseModel):
    user_id: str
    comment_text: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    approved: bool = False

class CommentInDB(Comment):
    id: str = Field(alias="_id")

# Routes
@app.get("/projects", response_model=List[ProjectInDB])
async def get_projects():
    projects = await db.projects.find().to_list(100)

    # Convert MongoDB ObjectId to string
    for project in projects:
        project["_id"] = str(project["_id"])

    return projects

@app.post("/projects", response_model=ProjectInDB)
async def create_project(project: Project):
    new_project = await db.projects.insert_one(project.dict())
    return {"_id": str(new_project.inserted_id), **project.dict()}

@app.put("/projects/{project_id}", response_model=ProjectInDB)
async def update_project(project_id: str, updated_project: Project):
    # Convert the string ID into a MongoDB ObjectId
    obj_id = ObjectId(project_id)

    # Find existing project
    existing_project = await db.projects.find_one({"_id": obj_id})
    if not existing_project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Update project fields
    await db.projects.update_one({"_id": obj_id}, {"$set": updated_project.dict()})

    # Fetch updated project
    updated_project_data = await db.projects.find_one({"_id": obj_id})

    # Convert ObjectId to string before returning
    updated_project_data["_id"] = str(updated_project_data["_id"])

    return updated_project_data

@app.delete("/projects/{project_id}", response_model=dict)
async def delete_project(project_id: str):
    obj_id = ObjectId(project_id)
    delete_result = await db.projects.delete_one({"_id": obj_id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}



@app.get("/education", response_model=List[EducationInDB])
async def get_education():
    education = await db.education.find().to_list(100)
    for edu in education:
        edu["_id"] = str(edu["_id"])
    return education

@app.post("/education", response_model=EducationInDB)
async def create_education(education: Education):
    new_education = await db.education.insert_one(education.dict())
    return {"_id": str(new_education.inserted_id), **education.dict()}

@app.put("/education/{education_id}", response_model=EducationInDB)
async def update_education(education_id: str, updated_education: Education):
    obj_id = ObjectId(education_id)
    existing_education = await db.education.find_one({"_id": obj_id})
    if not existing_education:
        raise HTTPException(status_code=404, detail="Education record not found")
    await db.education.update_one({"_id": obj_id}, {"$set": updated_education.dict()})
    updated_education_data = await db.education.find_one({"_id": obj_id})
    updated_education_data["_id"] = str(updated_education_data["_id"])
    return updated_education_data

@app.delete("/education/{education_id}", response_model=dict)
async def delete_education(education_id: str):
    obj_id = ObjectId(education_id)
    delete_result = await db.education.delete_one({"_id": obj_id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Education record not found")
    return {"message": "Education record deleted successfully"}

@app.get("/comments", response_model=List[CommentInDB])
async def get_comments():
    comments = await db.comments.find({"approved": True}).to_list(100)
    for comment in comments:
        comment["_id"] = str(comment["_id"])
    return comments

@app.post("/comments", response_model=CommentInDB)
async def create_comment(comment: Comment):
    comment.approved = False # Unapproved by default
    new_comment = await db.comments.insert_one(comment.dict())
    return {"_id": str(new_comment.inserted_id), **comment.dict()}

@app.put("/comments/{comment_id}", response_model=CommentInDB)
async def update_comment(comment_id: str, updated_comment: Comment):
    obj_id = ObjectId(comment_id)
    existing_comment = await db.comments.find_one({"_id": obj_id})
    if not existing_comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    await db.comments.update_one({"_id": obj_id}, {"$set": updated_comment.dict()})
    updated_comment_data = await db.comments.find_one({"_id": obj_id})
    updated_comment_data["_id"] = str(updated_comment_data["_id"])
    return updated_comment_data

@app.delete("/comments/{comment_id}", response_model=dict)
async def delete_comment(comment_id: str):
    obj_id = ObjectId(comment_id)
    delete_result = await db.comments.delete_one({"_id": obj_id})
    if delete_result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"message": "Comment deleted successfully"}

# Admin comments related endpoints
@app.get("/comments/pending", response_model=List[CommentInDB])
async def get_pending_comments():
    comments = await db.comments.find({"approved": False}).to_list(100)
    for comment in comments:
        comment["_id"] = str(comment["_id"])
    return comments

@app.patch("/comments/{comment_id}/approve", response_model=CommentInDB)
async def approve_comment(comment_id: str):
    obj_id = ObjectId(comment_id)
    updated = await db.comments.find_one_and_update(
        {"_id": obj_id},
        {"$set": {"approved": True}},
        return_document=True
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Comment not found")
    updated["_id"] = str(updated["_id"])
    return updated

@app.delete("/comments/{comment_id}/deny", response_model=dict)
async def deny_comment(comment_id: str):
    obj_id = ObjectId(comment_id)
    result = await db.comments.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Comment not found")
    return {"message": "Comment denied and deleted"}

