from strawberry.fastapi import BaseContext
from strawberry.permission import BasePermission
from strawberry.types import Info
from typing import Any

from ..exceptions import UnauthorizedException

class GraphQLContext(BaseContext):
    def __init__(self, *,
                 username: str,
                 data_key: str,
                 role: str) -> None:
        self.username = username
        self.data_key = data_key
        self.role = role

permission_map = {'ADMIN': {'PRODUCTS': ['CREATE', 'READ', 'UPDATE', 'DEACTIVATE', 'ACTIVATE', 'DELETE'],
                            'ORDERS': ['READ', 'MARK_AS_RECEIVED', 'CANCEL']},
                  'USER': {'PRODUCTS': ['READ'],
                           'ORDERS': ['CREATE', 'READ', 'UPDATE', 'DELETE', 'CANCEL']}}

class Authorization(BasePermission):
    error_class = UnauthorizedException
    message = 'User is not authorized to perform this action'

    def __init__(self, service: str, action: str) -> None:
        self.service = service
        self.action = action

    def has_permission(self, source: Any, info: Info, **kwargs) -> bool:
        try:
            return self.action in permission_map[info.context.role][self.service]
        except KeyError:
            return False