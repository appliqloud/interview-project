from typing import Optional

from .schemas import Product, CreateProductInput, UpdateProductInput
from ..models import Product as ProductModel
from ..exceptions import ProductNotFoundException, ProductAlreadyExistsException
from ....shared.rest.permissions import RESTContext

class ProductService:
    def __init__(self, context: Optional[RESTContext] = None):
        self.context = context

    def count_products(self) -> int:
        return ProductModel.type_index.count('PRODUCT',
                                             filter_condition = ProductModel.created_by.startswith(self.context.username))
    
    def find_product_by_id(self, id: str) -> Product:
        if not (model := ProductModel.get('PRODUCT', f'PRODUCT#{id}')) or not model.created_by.startswith(self.context.username):
            raise ProductNotFoundException({'productId': id})
        return Product.from_model(model)
    
    def find_products(self) -> list[Product]:
        return [Product.from_model(product) for product in ProductModel.type_index.query('PRODUCT',
                                                                                         filter_condition = ProductModel.created_by.startswith(self.context.username))]
    
    def create_product(self, product: CreateProductInput) -> Product:
        try:
            existing = ProductModel.get('PRODUCT', f'PRODUCT#{product.id}')
            if existing.created_by != self.context.username:
                raise ProductModel.DoesNotExist
            raise ProductAlreadyExistsException({'productId': product.id})
        except ProductModel.DoesNotExist:
            model = product.to_model(self.context)
            model.save()
            return Product.from_model(model)
        
    def update_product(self, id: str, product: UpdateProductInput) -> Product:
        try:
            model = ProductModel.get('PRODUCT', f'PRODUCT#{id}')
            if model.created_by != self.context.username:
                raise ProductNotFoundException({'productId': id})
            
            model  = product.to_model(self.context, model)
            model.save()
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            raise ProductNotFoundException({'productId': id})
    
    def deactivate_product(self, id: str) -> Product:
        try:
            model = ProductModel.get('PRODUCT', f'PRODUCT#{id}')
            if model.created_by != self.context.username:
                raise ProductNotFoundException({'productId': id})
            
            model.update([ProductModel.is_active.set(False)])
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            raise ProductNotFoundException({'productId': id})
    
    def activate_product(self, id: str) -> Product:
        try:
            model = ProductModel.get('PRODUCT', f'PRODUCT#{id}')
            if model.created_by != self.context.username:
                raise ProductNotFoundException({'productId': id})
            
            model.update([ProductModel.is_active.set(True)])
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            raise ProductNotFoundException({'productId': id})
    
    def delete_product(self, id: str) -> Product:
        try:
            model = ProductModel.get('PRODUCT', f'PRODUCT#{id}')
            model.delete()
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            raise ProductNotFoundException({'productId': id})
    
    