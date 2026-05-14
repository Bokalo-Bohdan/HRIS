from pydantic import BaseModel
from typing import Optional

# Схеми для Користувача
class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

# Схеми для Токена
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Схеми для Працівника
class EmployeeBase(BaseModel):
    name: str
    position: str
    department: str

class EmployeeCreate(EmployeeBase):
    user_id: int

class Employee(EmployeeBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True