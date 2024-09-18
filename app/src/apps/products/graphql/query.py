import strawberry
from strawberry.types import Info
from strawberry.permission import PermissionExtension

from .types import Product
from .resolvers import ProductResolvers as res
from ....shared.graphql.permissions import Authorization
from ....shared.graphql.types import Error

@strawberry.type
class Query:
    @strawberry.field(extensions = [PermissionExtension([Authorization('PRODUCTS', 'READ')])])
    def count_products(self, info: Info) -> int:
        return res(info.context).count_products()

    @strawberry.field(extensions = [PermissionExtension([Authorization('PRODUCTS', 'READ')])])
    def find_product_by_id(self, info: Info, 
                           id: str) -> Product | Error:
        return res(info.context).find_product_by_id(id)

    @strawberry.field(extensions = [PermissionExtension([Authorization('PRODUCTS', 'READ')])])
    def find_products(self, info: Info) -> list[Product]:
        return res(info.context).find_products()