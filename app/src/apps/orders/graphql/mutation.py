import strawberry
from strawberry.types import Info
from strawberry.permission import PermissionExtension

from .types import Order, OrderInput
from .resolvers import OrderResolvers as res
from ....shared.graphql.permissions import Authorization
from ....shared.graphql.types import Error

@strawberry.type
class Mutation:
    @strawberry.mutation(extensions = [PermissionExtension([Authorization('ORDERS', 'CREATE')])])
    def create_order(self, info: Info, 
                     order: OrderInput) -> Order | Error:
        return res(info.context).create_order(order)
    
    @strawberry.mutation(extensions = [PermissionExtension([Authorization('ORDERS', 'MARK_AS_RECEIVED')])])
    def mark_order_as_received(self, info: Info, 
                               id: str) -> Order | Error:
        return res(info.context).mark_order_as_received(id)
    
    @strawberry.mutation(extensions = [PermissionExtension([Authorization('ORDERS', 'CANCEL')])])
    def cancel_order(self, info: Info, 
                     id: str) -> Order | Error:
        return res(info.context).cancel_order(id)