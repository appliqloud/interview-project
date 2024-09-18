import strawberry
from typing import Optional

from ..models import User as UserModel

@strawberry.type
class User:
    id: str
    first_name: str
    last_name: str
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