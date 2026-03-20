from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal, Interaction
from graph import graph
from database import SessionLocal
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

from database import SessionLocal 

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

origins = [
    "http://localhost:5173", 
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            
    allow_credentials=True,
    allow_methods=["*"],              
    allow_headers=["*"],              
)

@app.post("/process_interaction")
async def process(text: str, db: Session = Depends(get_db)):
    result = await graph.ainvoke({"input_text": text})
    # Update logic (for brevity, insert simplified)
    db.add(Interaction(**result))
    db.commit()
    #return result
    return {"doctor_name": "Dr. Smith", "patient_name": "John Doe", "diagnosis": "Flu"}

