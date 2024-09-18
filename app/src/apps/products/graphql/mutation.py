import strawberry
from strawberry.types import Info
from strawberry.permission import PermissionExtension

from .types import CreateProductInput, UpdateProductInput, Product
from .resolvers import ProductResolvers as res
from ....shared.graphql.permissions import Authorization
from ....shared.graphql.types import Error

@strawberry.type
class Mutation:
    @strawberry.mutation(extensions = [PermissionExtension([Authorization('PRODUCTS', 'CREATE')])])
    def create_product(self, info: Info, 
                       product: CreateProductInput) -> Product | Error:
        return res(info.context).create_product(product)

    @strawberry.mutation(extensions = [PermissionExtension([Authorization('PRODUCTS', 'UPDATE')])])
    def update_product(self, info: Info, 
                       id: str, product: UpdateProductInput) -> Product | Error:
        return res(info.context).update_product(id, product)

    @strawberry.mutation(extensions = [PermissionExtension([Authorization('PRODUCTS', 'DEACTIVATE')])])
    def deactivate_product(self, info: Info, 
                           id: str) -> Product | Error:
        return res(info.context).deactivate_product(id)

    @strawberry.mutation(extensions = [PermissionExtension([Authorization('PRODUCTS', 'ACTIVATE')])])
    def activate_product(self, info: Info, 
                         id: str) -> Product | Error:
        return res(info.context).activate_product(id)

    @strawberry.mutation(extensions = [PermissionExtension([Authorization('PRODUCTS', 'DELETE')])])
    def delete_product(self, info: Info, 
                       id: str) -> Product | Error:
        return res(info.context).delete_product(id)
