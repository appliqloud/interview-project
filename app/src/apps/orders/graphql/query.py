import strawberry
from strawberry.types import Info
from strawberry.permission import PermissionExtension

from .types import Order
from .resolvers import OrderResolvers as res
from ....shared.graphql.permissions import Authorization
from ....shared.graphql.types import Error

@strawberry.type
class Query:
    @strawberry.field(extensions = [PermissionExtension([Authorization('ORDERS', 'READ')])])
    def count_orders(self, info: Info) -> int:
        return res(info.context).count_orders()
    
    @strawberry.field(extensions = [PermissionExtension([Authorization('ORDERS', 'READ')])])
    def find_order_by_id(self, info: Info, 
                         id: str) -> Order | Error:
        return res(info.context).find_order_by_id(id)
    
    @strawberry.field(extensions = [PermissionExtension([Authorization('ORDERS', 'READ')])])
    def find_orders(self, info: Info) -> list[Order]:
        return res(info.context).find_orders()