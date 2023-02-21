from sqlalchemy.orm import Session

from . import models, shcema

def get_users(db:Session,skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_user_by_email(db:Session,email:str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db:Session,id:int):
    return db.query(models.User).filter(models.User.id == id).first()

def create_user(db:Session,user:shcema.User):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return shcema.UserRead(id=db_user.id,name=db_user.name,email=db_user.email)

def update_user(db:Session,user:shcema.UserRead):
    db.query(models.User).filter(models.User.id==user.id).update({"email":user.email,"name":user.name})
    db.commit()

    

def delete_user(db:Session,id:int):
    db_user = db.query(models.User).filter(models.User.id == id).first()

    db.delete(db_user)
    db.commit()

    return shcema.UserRead(id=db_user.id,name=db_user.name,email=db_user.email)