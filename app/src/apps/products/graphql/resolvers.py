
from .types import Product, CreateProductInput, UpdateProductInput
from ..models import Product as ProductModel
from ..exceptions import ProductNotFoundException, ProductAlreadyExistsException
from ....shared.graphql.permissions import GraphQLContext
from ....shared.graphql.types import Error

class ProductResolvers:
    def __init__(self, context: GraphQLContext):
        self.context = context

    def count_products(self) -> int:
        return ProductModel.type_index.count('PRODUCT',
                                             filter_condition = ProductModel.created_by.startswith(self.context.username))
    
    def find_product_by_id(self, id: str) -> Product | Error:
        if not (product := ProductModel.get(id)) or not product.created_by.startswith(self.context.username):
            return Error.from_exception(ProductNotFoundException({'productId': id}))
        return product
    
    def find_products(self) -> list[Product]:
        return [Product.from_model(product) for product in ProductModel.type_index.query('PRODUCT',
                                                                                         filter_condition = ProductModel.created_by.startswith(self.context.username))]
    
    def create_product(self, product: CreateProductInput) -> Product | Error:
        try:
            existing = ProductModel.get('PRODUCT', f'PRODUCT#{product.id}')
            if existing.created_by != self.context.username:
                raise ProductModel.DoesNotExist
            return Error.from_exception(ProductAlreadyExistsException({'productId': product.id}))
        except ProductModel.DoesNotExist:
            model = product.to_model(self.context)
            model.save()
            return Product.from_model(model)

    def update_product(self, id: str, product: UpdateProductInput) -> Product | Error:
        try:
            model = ProductModel.get('PRODUCT', f'PRODUCT#{id}')
            if model.created_by != self.context.username:
                return Error.from_exception(ProductNotFoundException({'productId': id}))
            
            model  = product.to_model(self.context, model)
            model.save()
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            return Error.from_exception(ProductNotFoundException({'productId': id}))

    def deactivate_product(self, id: str) -> Product | Error:
        try:
            model = ProductModel.get('PRODUCT', f'PRODUCT#{id}')
            if model.created_by != self.context.username:
                return Error.from_exception(ProductNotFoundException({'productId': id}))
            
            model.update([ProductModel.is_active.set(False)])
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            return Error.from_exception(ProductNotFoundException({'productId': id}))

    def activate_product(self, id: str) -> Product | Error:
        try:
            model = ProductModel.get('PRODUCT', f'PRODUCT#{id}')
            if model.created_by != self.context.username:
                return Error.from_exception(ProductNotFoundException({'productId': id}))
            
            model.update([ProductModel.is_active.set(True)])
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            return Error.from_exception(ProductNotFoundException({'productId': id}))

    def delete_product(self, id: str) -> Product | Error:
        try:
            model = ProductModel.get('PRODUCT', f'PRODUCT#{id}')
            if model.created_by != self.context.username:
                return Error.from_exception(ProductNotFoundException({'productId': id}))
            
            model.delete()
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            return Error.from_exception(ProductNotFoundException({'productId': id}))
        