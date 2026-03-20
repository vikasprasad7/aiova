from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Database setup
DATABASE_URL = "mysql+pymysql://website1:abce1235@localhost/healthcare_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Interaction(Base):
    __tablename__ = "interactions"
    id = Column(Integer, primary_key=True, index=True)
    doctor_name = Column(String(255))
    interaction_type = Column(String(50))
    date = Column(String(50))
    time = Column(String(50))
    topics = Column(Text)
    sentiment = Column(String(20))

Base.metadata.create_all(bind=engine)
