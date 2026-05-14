from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas, auth
from jose import JWTError, jwt

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Функція для отримання поточного користувача за токеном
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.email == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user

# 1. РЕЄСТРАЦІЯ (Створення користувача + профілю)
@app.post("/api/register", response_model=schemas.Employee)
def register_user(user_in: schemas.UserCreate, name: str, position: str, department: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Хешуємо пароль!
    hashed_pwd = auth.get_password_hash(user_in.password)
    new_user = models.User(email=user_in.email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Створюємо профіль працівника, прив'язаний до юзера
    new_employee = models.Employee(name=name, position=position, department=department, user_id=new_user.id)
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)
    return new_employee

# 2. ЛОГІН (Отримання токена)
@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# 3. Отримання профілю ПОТОЧНОГО користувача
@app.get("/api/users/me", response_model=schemas.Employee)
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user.employee