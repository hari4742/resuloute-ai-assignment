from pydantic import BaseModel
import pickle

class UserBase(BaseModel):
    name:str
    email:str

class UserRead(UserBase):
    id:int

class User(UserBase):
    face_encoding:bytes