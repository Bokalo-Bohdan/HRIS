from datetime import datetime, timedelta
from jose import jwt
from passlib.hash import argon2 # Використовуємо argon2 замість bcrypt

# Твій секретний ключ
SECRET_KEY = "taras_super_secret_hris_key_2026"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 600

# Функція для перетворення пароля на хеш
def get_password_hash(password):
    return argon2.hash(password)

# Функція для перевірки пароля
def verify_password(plain_password, hashed_password):
    try:
        return argon2.verify(plain_password, hashed_password)
    except:
        return False

# Функція для створення JWT-токена
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)