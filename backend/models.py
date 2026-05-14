from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    # Зв'язок: один користувач має один профіль працівника
    employee = relationship("Employee", back_populates="user", uselist=False)

class Employee(Base):
    __tablename__ = "employees"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    position = Column(String)
    department = Column(String)
    
    # Створюємо зв'язок: тепер працівник "знає", до якого акаунту він належить
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="employee")