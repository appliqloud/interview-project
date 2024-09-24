import strawberry
from enum import Enum
import uuid

from ..models import Order as OrderModel

from ...products.graphql.types import Product

from ....shared.graphql.permissions import GraphQLContext

@strawberry.enum
class OrderStatus(Enum):
    PENDING = 'PENDING'
    CANCELLED = 'CANCELLED'
    RECEIVED = 'RECEIVED'

@strawberry.input
class OrderInput:
    _product_price: strawberry.Private[float] = 0.0

    product_id: str
    quantity: int

    def to_model(self, context: GraphQLContext) -> OrderModel:
        order_id = str(uuid.uuid4())
        return OrderModel(PK = f'DATA_KEY#{context.data_key}',
                          SK = order_id,
                          id = order_id,
                          status = 'PENDING',
                          product_id = self.product_id,
                          quantity = self.quantity,
                          total = self._product_price * self.quantity,
                          created_by = context.username)
    
@strawberry.type
class Order:
    _product_id: strawberry.Private[str]

    id: str
    status: OrderStatus
    quantity: int
    total: float

    @strawberry.field
    def product(self, info: strawberry.Info) -> Product:
        return Product.from_id(info.context, self._product_id)

    @classmethod
    def from_model(cls, model: OrderModel) -> 'Order':
        return cls(id = model.id,
                   status = OrderStatus(model.status),
                   _product_id = model.product_id,
                   quantity = model.quantity,
                   total = model.total)
    