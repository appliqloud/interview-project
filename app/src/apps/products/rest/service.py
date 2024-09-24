from typing import Optional

from .schemas import Product, CreateProductInput, UpdateProductInput, ProductCount
from ..models import Product as ProductModel
from ..exceptions import ProductNotFoundException, ProductAlreadyExistsException
from ....shared.rest.permissions import RESTContext

class ProductService:
    def __init__(self, context: Optional[RESTContext] = None):
        self.context = context

    def count_products(self) -> ProductCount:
        return ProductCount(count = ProductModel.count(f'DATA_KEY#{self.context.data_key}',
                                                       filter_condition = ProductModel._TYPE == 'PRODUCT',))
    
    def find_product_by_id(self, id: str) -> Product:
        try:
            return Product.from_model(ProductModel.get(f'DATA_KEY#{self.context.data_key}', f'PRODUCT#{id}') )
        except ProductModel.DoesNotExist:
            raise ProductNotFoundException({'productId': id})
            
    def find_products(self) -> list[Product]:
        return [Product.from_model(product) for product in ProductModel.query(f'DATA_KEY#{self.context.data_key}',
                                                                              filter_condition = ProductModel._TYPE == 'PRODUCT')]
    
    def create_product(self, product: CreateProductInput) -> Product:
        try:
            ProductModel.get(f'DATA_KEY#{self.context.data_key}', f'PRODUCT#{product.id}')
            raise ProductAlreadyExistsException({'productId': product.id})
        except ProductModel.DoesNotExist:
            model = product.to_model(self.context)
            model.save()
            return Product.from_model(model)
        
    def update_product(self, id: str, product: UpdateProductInput) -> Product:
        try:
            model = ProductModel.get(f'DATA_KEY#{self.context.data_key}', f'PRODUCT#{id}')
            model  = product.to_model(self.context, model)
            model.save()
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            raise ProductNotFoundException({'productId': id})
    
    def deactivate_product(self, id: str) -> Product:
        try:
            model = ProductModel.get(f'DATA_KEY#{self.context.data_key}', f'PRODUCT#{id}')
            model.update([ProductModel.is_active.set(False)])
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            raise ProductNotFoundException({'productId': id})
    
    def activate_product(self, id: str) -> Product:
        try:
            model = ProductModel.get(f'DATA_KEY#{self.context.data_key}', f'PRODUCT#{id}')
            model.update([ProductModel.is_active.set(True)])
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            raise ProductNotFoundException({'productId': id})
    
    def delete_product(self, id: str) -> Product:
        try:
            model = ProductModel.get(f'DATA_KEY#{self.context.data_key}', f'PRODUCT#{id}')
            model.delete()
            return Product.from_model(model)
        except ProductModel.DoesNotExist:
            raise ProductNotFoundException({'productId': id})
    
    