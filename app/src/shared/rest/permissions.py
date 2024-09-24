from ..exceptions import UnauthorizedException

class RESTContext:
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

class Authorization:
    def __init__(self, service: str, action: str) -> None:
        self.service = service
        self.action = action

    def has_permission(self, context: RESTContext) -> bool:
        try:
            print(permission_map[context.role][self.service])
            print(self.action)
            if self.action in permission_map[context.role][self.service]:
                return True
            else:
                raise UnauthorizedException()
        except KeyError:
            raise UnauthorizedException()