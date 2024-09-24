from fastapi.security import OAuth2PasswordRequestForm
from typing import Optional
import datetime
import bcrypt
import jwt
import os

from .schemas import User, Token
from ..models import User as UserModel
from ..exceptions import UserNotFoundException
from ....shared.exceptions import InvalidCredentialsException
from ....shared.rest.permissions import RESTContext

class UserService:
    def __init__(self, context: Optional[RESTContext] = None) -> None:
        self.context = context

    def me(self) -> User:
        if not (user := User.from_id(self.context.username)):
            raise UserNotFoundException({'userId': self.context.username})
        return user

    @classmethod
    def login(cls, form_data: OAuth2PasswordRequestForm) -> Token:
        try:
            user = UserModel.get('USER', f'USER#{form_data.username}')
        except UserModel.DoesNotExist:
            raise UserNotFoundException({'userId': form_data.username})
        
        if not bcrypt.checkpw(form_data.password.encode(), user.password_hash):
            raise InvalidCredentialsException({'userId': form_data.username,
                                               'password': form_data.password})
        return Token(access_token = cls.__create_access_token({'sub': user.id, 'role': user.role, 'dataKey': user.data_key}))
        
    @classmethod
    def __create_access_token(cls, data: dict) -> str:
        to_encode = data.copy()
        to_encode.update({'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes = 15)})
        return jwt.encode(to_encode, os.getenv('JWT_SECRET_KEY'), algorithm = os.getenv('JWT_ALGORITHM'))
        