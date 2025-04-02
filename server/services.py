from sqlalchemy.orm import Session
import models as _models
import schemas as _schemas
from passlib.context import CryptContext
import database as _database

from schemas.task import TaskCreate

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def _add_tables():
    return _database.Base.metadata.create_all(bind=_database.engine)

def get_db():
    db= _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_user_by_username(db: Session, username: str):
    return db.query(_models.User).filter(_models.User.username == username).first()
# Task services
async def create_task(db: Session, task: TaskCreate, user_id: int):
    db_task = _models.Task(**task.dict(), owner_id=user_id)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

async def get_user_tasks(db: Session, user_id: int):
    return db.query(_models.Task).filter(_models.Task.owner_id == user_id).all()

async def get_task_by_id(db: Session, task_id: int, user_id: int):
    return db.query(_models.Task).filter(
        _models.Task.id == task_id,
        _models.Task.owner_id == user_id
    ).first()

async def update_task(db: Session, task_id: int, task: TaskCreate, user_id: int):
    db_task = await get_task_by_id(db=db, task_id=task_id, user_id=user_id)
    if not db_task:
        return None

    for key, value in task.dict().items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)
    return db_task

async def delete_task(db: Session, task_id: int, user_id: int):
    db_task = await get_task_by_id(db=db, task_id=task_id, user_id=user_id)
    if not db_task:
        return False

    db.delete(db_task)
    db.commit()
    return True

# User services
async def create_user(user: _schemas.CreateUser, db: Session):
    hashed_password = hash_password(user.password)
    user_data = user.dict()
    user_data["password_hash"] = hashed_password
    user_data.pop("password")

    new_user = _models.User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

async def get_all_users(db: Session):
    return db.query(_models.User).all()

async def get_user_by_id(user_id: int, db: Session):
    return db.query(_models.User).filter(_models.User.id == user_id).first()