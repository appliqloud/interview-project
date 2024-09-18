from pydantic import BaseModel
from datetime import datetime
from typing import Optional

from ..models import Product as ProductModel, ProductTranslation as ProductTranslationModel
from ....shared.rest.permissions import RESTContext

class ProductCount(BaseModel):
    count: int
    
class ProductTranslation(BaseModel):
    language: str
    description: str

    def to_model(self):
        return ProductTranslationModel(language = self.language,
                                       description = self.description)
    
    @classmethod
    def from_model(cls, model: ProductTranslationModel):
        return cls(language = model.language,
                   description = model.description)

class CreateProductInput(BaseModel):
    id: str
    price: float
    translations: list[ProductTranslation]

    def to_model(self, context: RESTContext) -> ProductModel:
        return ProductModel(SK = f'PRODUCT#{self.id}',
                            id = self.id,
                            price = self.price,
                            translations = [translation.to_model() for translation in self.translations],
                            created_by = context.username)

class UpdateProductInput(BaseModel):
    price: float
    translations: list[ProductTranslation]

    def to_model(self, context: RESTContext, 
                 model: ProductModel) -> ProductModel:
        model.price = self.price
        model.translations = [translation.to_model() for translation in self.translations]
        model.updated_at = datetime.now()
        model.updated_by = context.username
        return model

class Product(BaseModel):
    id: str
    price: float
    translations: list[ProductTranslation]

    @classmethod
    def from_model(cls, model: ProductModel) -> 'Product':
        return cls(id = model.id,
                   price = model.price,
                   translations = [ProductTranslation.from_model(translation) for translation in model.translations])
    
    @classmethod
    def from_id(cls, id: str) -> Optional['Product']:
        try:
            return cls.from_model(ProductModel.get('PRODUCT', f'PRODUCT#{id}'))
        except ProductModel.DoesNotExist:
            return None