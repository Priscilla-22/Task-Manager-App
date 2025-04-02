from datetime import timedelta
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import schemas as _schemas
import services as _services
from schemas.user import CreateUser, User
from schemas.task import Task, TaskCreate
from schemas.token import Token,LoginRequest
import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://192.168.100.5:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Auth endpoints
@app.post("/api/auth/register", response_model=Token)
async def register_user(
        user: _schemas.CreateUser,
        db: Session = Depends(_services.get_db)
):
    db_user = await _services.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # Create user
    created_user = await _services.create_user(user=user, db=db)

    # Automatically log in the user by returning a token
    access_token = auth.create_access_token(
        data={"sub": created_user.username},
        expires_delta=timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/auth/login", response_model=Token)
async def login(
        credentials: LoginRequest,
        db: Session = Depends(_services.get_db)
):
    user = auth.authenticate_user(db, credentials.identifier, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/users/me", response_model=User)
async def read_current_user(
        current_user: _schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(_services.get_db)
):
    return current_user


# Task endpoints (protected)
@app.get("/api/tasks", response_model=List[Task])
async def read_tasks(
        current_user: _schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(_services.get_db)
):
    return await _services.get_user_tasks(db=db, user_id=current_user.id)


@app.post("/api/tasks", response_model=Task)
async def create_task(
        task: TaskCreate,
        current_user: _schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(_services.get_db)
):
    return await _services.create_task(db=db, task=task, user_id=current_user.id)


@app.put("/api/tasks/{task_id}", response_model=Task)
async def update_task(
        task_id: int,
        task: TaskCreate,
        current_user: _schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(_services.get_db)
):
    updated_task = await _services.update_task(db=db, task_id=task_id, task=task, user_id=current_user.id)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task


@app.delete("/api/tasks/{task_id}")
async def delete_task(
        task_id: int,
        current_user: _schemas.User = Depends(auth.get_current_user),
        db: Session = Depends(_services.get_db)
):
    success = await _services.delete_task(db=db, task_id=task_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}


# User endpoints (for testing)
@app.get("/api/users", response_model=List[_schemas.User])
async def get_users(db: Session = Depends(_services.get_db)):
    return await _services.get_all_users(db=db)


@app.get("/api/users/{user_id}", response_model=_schemas.User)
async def get_user(
        user_id: int,
        db: Session = Depends(_services.get_db)
):
    return await _services.get_user_by_id(user_id=user_id, db=db)