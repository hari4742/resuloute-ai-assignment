from sqlalchemy import String , Integer, Column, PickleType
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True,index=True)
    name = Column(String,nullable=False)
    email = Column(String,nullable=False,unique=True)
    face_encoding = Column(PickleType,nullable=False)

    def __repr__(self):
        return f"User {self.id}: {self.name},{self.email}"