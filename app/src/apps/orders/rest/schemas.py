from pydantic import BaseModel, PrivateAttr, Field
from datetime import datetime
from typing import Optional
import uuid

from ..models import Order as OrderModel
from ....shared.rest.permissions import RESTContext

class OrderCount(BaseModel):
    count: int

class OrderInput(BaseModel):
    _id: uuid.UUID = PrivateAttr(default_factory = uuid.uuid4)
    _product_price: float = PrivateAttr()

    product_id: str = Field(..., validation_alias = 'productId')
    quantity: int

    def to_model(self, context: RESTContext,
                 model: Optional[OrderModel] = None) -> OrderModel:
        if not model:
            model = OrderModel(PK = f'DATA_KEY#{context.data_key}',
                               SK = f'ORDER#{self._id}',
                               id = str(self._id),
                               status = 'PENDING',
                               created_by = context.username)
        model.product_id = self.product_id
        model.quantity = self.quantity
        model.total = self._product_price * self.quantity
        model.updated_by = context.username
        model.updated_at = datetime.now()
        return model
    
class Order(BaseModel):
    id: str
    status: str
    product_id: str = Field(..., serialization_alias = 'productId')
    quantity: int
    total: float

    @classmethod
    def from_model(cls, model: OrderModel) -> 'Order':
        return cls(id = model.id,
                   status = model.status,
                   product_id = model.product_id,
                   quantity = model.quantity,
                   total = model.total)
    
