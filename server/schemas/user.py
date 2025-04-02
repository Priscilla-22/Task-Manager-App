import pydantic as _pydantic
from utils import hash_password
from pydantic import BaseModel, EmailStr
from typing import Optional




class _BaseUser(_pydantic.BaseModel):
    first_name: str
    last_name: str
    username: str
    email: EmailStr


class User(_BaseUser):
    id: int
    # password: str

    class Config:
        from_attributes = True

class CreateUser(_BaseUser):
    password: str

# class Token(BaseModel):
#     access_token: str
#     token_type: str
#
# class TokenData(BaseModel):
#     username: Optional[str] = None