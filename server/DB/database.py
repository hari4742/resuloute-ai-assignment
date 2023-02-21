from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
import os

load_dotenv()

USER_NAME = os.getenv("DB_USER_NAME")
PASSWORD = os.getenv("DB_PASSWORD")
SERVER = os.getenv("POSTGRES_SERVER")
PORT = os.getenv("POSTGRES_PORT")
DB_NAME = os.getenv("DB_NAME")

DATABASE_URL = f"postgresql://{USER_NAME}:{PASSWORD}@{SERVER}:{PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()