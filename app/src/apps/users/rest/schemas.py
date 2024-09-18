from pydantic import BaseModel, Field
from typing import Optional

from ..models import User as UserModel

class User(BaseModel):
    id: str
    first_name: str = Field(..., serialization_alias = 'firstName')
    last_name: str = Field(..., serialization_alias = 'lastName')
    role: str

    @classmethod
    def from_model(cls, model: UserModel) -> 'User':
        return cls(id = model.id,
                   first_name = model.first_name,
                   last_name = model.last_name,
                   role = model.role)
    
    @classmethod
    def from_id(cls, id: str) -> Optional['User']:
        try:
            return cls.from_model(UserModel.get('USER', f'USER#{id}'))
        except UserModel.DoesNotExist:
            return None
    
class Token(BaseModel):
    access_token: str = Field(..., serialization_alias = 'accessToken')