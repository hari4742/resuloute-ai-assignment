from fastapi import FastAPI,Form,UploadFile,Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
import face_recognition as fr
import numpy as np
import pickle

from sqlalchemy.orm import Session
from DB import shcema,crud,models
from DB.database import get_db,engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"status":"OK","message":"API is working successfully.."}

@app.get("/users")
def get_users(db:Session=Depends(get_db)):
    users = crud.get_users(db)
    return {"status":"OK","data":[shcema.UserRead(**user.__dict__) for user in users]}

@app.post("/register")
def register_user(img:UploadFile,name:str=Form(),email:str=Form(),db:Session=Depends(get_db)):
    db_user = crud.get_user_by_email(db,email)
    if db_user:
        return HTTPException(status_code=400,detail="User already exits with that mail.")

    image = fr.load_image_file(img.file)
    image_encodings = np.array(fr.face_encodings(image))
    pickled_data = pickle.dumps(image_encodings)

    user = shcema.User(email=email,name=name,face_encoding=pickled_data)
    return crud.create_user(db,user)

@app.post("/recognise")
def recognize_user(img:UploadFile,db:Session=Depends(get_db)):

    unknown_image = fr.load_image_file(img.file)
    unknown_image_encodings = np.array(fr.face_encodings(unknown_image))

    for user in crud.get_users(db):
        known_image_encoding = pickle.loads(user.face_encoding)
        if fr.compare_faces(known_image_encoding,unknown_image_encodings)[0]:
            return {"status":"OK","message":"User Found","user":{"id":user.id,"name":user.name,"email":user.email}}
        
    return {"status":"OK","message":"User Not Found. Please Consider register yourself."}

@app.delete("/user/{id}")
def del_user(id:int,db:Session=Depends(get_db)):
    user = crud.get_user_by_id(db,id)
    if user:
        crud.delete_user(db,id)
        return {"status":"OK","message":f"User with id {user.id} is successfully delete"}
    return HTTPException(status_code=400,detail="No User exits with that id.")

@app.put("/user/{id}")
def user_update(id:int,name:str=Form(),email:str=Form(),db:Session=Depends(get_db)):
    db_user = crud.get_user_by_email(db,email)
    if db_user and id != db_user.id:
        return HTTPException(status_code=400,detail="Can't Update Email, it has already been taken")
    crud.update_user(db,shcema.UserRead(id=id,name=name,email=email))

    return {"status":"OK","message":f"User with id {id} is successfully updated"}