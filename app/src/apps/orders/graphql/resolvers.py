from .types import Order, OrderInput
from ..models import Order as OrderModel
from ..exceptions import OrderNotFoundException, InvalidProductException
from ...products.methods import find_product_by_id
from ....shared.graphql.permissions import GraphQLContext
from ....shared.graphql.types import Error
from ....shared.exceptions import CustomException

class OrderResolvers:
    def __init__(self, context: GraphQLContext):
        self.context = context

    def count_orders(self) -> int:
        return OrderModel.type_index.count('ORDER',
                                           filter_condition = OrderModel.created_by.startswith(self.context.username))
    
    def find_order_by_id(self, id: str) -> Order | Error:
        if not (model := OrderModel.get('ORDER', f'ORDER#{id}')) or not model.created_by.startswith(self.context.username):
            return Error.from_exception(OrderNotFoundException({'orderId': id}))
        return Order.from_model(model)
    
    def find_orders(self) -> list[Order]:
        return [Order.from_model(order) for order in OrderModel.type_index.query('ORDER',
                                                                                 filter_condition = OrderModel.created_by.startswith(self.context.username))]
    
    def create_order(self, order: OrderInput) -> Order | Error:
        try:
            self.__verify_product(order)
            model = order.to_model(self.context)
            model.save()
            return Order.from_model(model)
        except CustomException as e:
            return Error.from_exception(e)

    def cancel_order(self, id: str) -> Order | Error:
        try:
            model = OrderModel.get('ORDER', f'ORDER#{id}')
            if model.created_by != self.context.username:
                return Error.from_exception(OrderNotFoundException({'orderId': id}))
            
            model.update([OrderModel.status.set('CANCELLED')])
            return Order.from_model(model)
        except OrderModel.DoesNotExist:
            return Error.from_exception(OrderNotFoundException({'orderId': id}))
    
    def mark_order_as_received(self, id: str) -> Order | Error:
        try:
            model = OrderModel.get('ORDER', f'ORDER#{id}')
            if model.created_by != self.context.username:
                return Error.from_exception(OrderNotFoundException({'orderId': id}))
            
            model.update([OrderModel.status.set('RECEIVED')])
            return Order.from_model(model)
        except OrderModel.DoesNotExist:
            return Error.from_exception(OrderNotFoundException({'orderId': id}))
        
    def __verify_product(self, order: OrderInput) -> None:
        if not (product := find_product_by_id(order.product_id)) or not product.is_active:
            raise InvalidProductException({'productId': order.product_id})
        order._product_price = product.price
    
