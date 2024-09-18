import strawberry
from datetime import datetime
from typing import Optional

from ..models import Product as ProductModel, ProductTranslation as ProductTranslationModel
from ....shared.graphql.permissions import GraphQLContext

@strawberry.input
class ProductTranslationInput:
    language: str
    description: str

    def to_model(self) -> ProductTranslationModel:
        return ProductTranslationModel(language = self.language,
                                       description = self.description)
    
@strawberry.input
class CreateProductInput:
    id: str
    price: float
    translations: list[ProductTranslationInput]

    def to_model(self, context: GraphQLContext) -> ProductModel:
        return ProductModel(SK = f'PRODUCT#{self.id}',
                            id = self.id,
                            price = self.price,
                            translations = [t.to_model() for t in self.translations],
                            created_by = context.username)

@strawberry.input
class UpdateProductInput:
    price: float
    translations: list[ProductTranslationInput]

    def to_model(self, context: GraphQLContext,
                 model: ProductModel) -> ProductModel:
        model.price = self.price
        model.translations = [t.to_model() for t in self.translations]
        model.updated_by = context.username
        model.updated_at = datetime.now()
        return model
    
@strawberry.type
class ProductTranslation:
    language: str
    description: str

    @classmethod
    def from_model(cls, model: ProductTranslationModel) -> 'ProductTranslation':
        return cls(language = model.language,
                   description = model.description)
    
@strawberry.type
class Product:
    id: str
    is_active: bool
    price: float
    translations: list[ProductTranslation]

    @strawberry.field
    def translation(self, language: str) -> Optional[ProductTranslation]:
        return next((t for t in self.translations if t.language == language), None)
    
    @classmethod
    def from_model(cls, model: ProductModel) -> 'Product':
        return cls(id = model.id,
                   is_active = model.is_active,
                   price = model.price,
                   translations = [ProductTranslation.from_model(t) for t in model.translations])
    
    @classmethod
    def from_id(cls, id: str) -> Optional['Product']:
        try:
            return cls.from_model(ProductModel.get('PRODUCT', f'PRODUCT#{id}'))
        except ProductModel.DoesNotExist:
            return None