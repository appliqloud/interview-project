from .schemas import OrderCount, Order, OrderInput

from ..exceptions import OrderNotFoundException, InvalidProductException
from ..models import Order as OrderModel

from ...products.methods import find_product_by_id

from ....shared.rest.permissions import RESTContext

class OrderService:
    def __init__(self, context: RESTContext):
        self.context = context

    def count_orders(self) -> OrderCount:
        return OrderCount(count = OrderModel.count(f'DATA_KEY#{self.context.data_key}',
                                                   filter_condition = OrderModel._TYPE == 'ORDER'))
    
    def find_order_by_id(self, id: str) -> Order:
        try:
            return Order.from_model(OrderModel.get(f'DATA_KEY#{self.context.data_key}', f'ORDER#{id}'))
        except OrderModel.DoesNotExist:
            raise OrderNotFoundException({'orderId': id})
    
    def find_orders(self) -> list[Order]:
        return [Order.from_model(model) for model in OrderModel.query(f'DATA_KEY#{self.context.data_key}',
                                                                      filter_condition = OrderModel._TYPE == 'ORDER',)]
    
    def create_order(self, order: OrderInput) -> Order:
        self.__verify_product(order)
        model = order.to_model(self.context)
        model.save()
        return Order.from_model(model)
    
    def cancel_order(self, id: str) -> Order:
        try:
            model = OrderModel.get(f'DATA_KEY#{self.context.data_key}', f'ORDER#{id}')
            model.update([OrderModel.status.set('CANCELLED')])
            return Order.from_model(model)
        except OrderModel.DoesNotExist:
            raise OrderNotFoundException({'orderId': id})
        
    def mark_order_as_received(self, id: str) -> Order:
        try:
            model = OrderModel.get(f'DATA_KEY#{self.context.data_key}', f'ORDER#{id}')
            model.update([OrderModel.status.set('RECEIVED')])
            return Order.from_model(model)
        except OrderModel.DoesNotExist:
            raise OrderNotFoundException({'orderId': id})
        
    def __verify_product(self, order: OrderInput) -> None:
        if not (product := find_product_by_id(self.context, order.product_id)) or product.PK != f'DATA_KEY#{self.context.data_key}':
            raise InvalidProductException({'productId': order.product_id})
        order._product_price = product.price
    
