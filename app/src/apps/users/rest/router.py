from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated

from .schemas import User, Token
from .service import UserService as svc
from ....shared.dependencies import get_rest_context
from ....shared.rest.permissions import RESTContext

router = APIRouter()

@router.post('/token',
             status_code = status.HTTP_200_OK,
             response_model = Token)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]) -> Token:
    return svc.login(form_data)

@router.get('/me',
            status_code = status.HTTP_200_OK,
            response_model = User)
def me(context: Annotated[RESTContext, Depends(get_rest_context)]) -> User:
    return svc(context).me()
