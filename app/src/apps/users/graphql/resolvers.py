from .types import User
from ..exceptions import UserNotFoundException
from ....shared.graphql.permissions import GraphQLContext
from ....shared.graphql.types import Error

class UserResolvers:
    def __init__(self, context: GraphQLContext):
        self.context = context

    def me(self) -> User | Error:
        if not (user := User.from_id(self.context.username)):
            return Error.from_exception(UserNotFoundException({'userId': self.context.username}))
        return user