import strawberry
from strawberry.types import Info

from .types import User
from .resolvers import UserResolvers as res
from ....shared.graphql.types import Error

@strawberry.type
class Query:
    @strawberry.field
    def me(self, info: Info) -> User | Error:
        return res(info.context).me()