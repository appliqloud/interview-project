from typing import Optional

from ...shared.exceptions import CustomException

class OrderNotFoundException(CustomException):
    def __init__(self, context: Optional[dict] = None) -> None:
        status_code = 404
        message = f'Order {context["orderId"]} not found'
        super().__init__(status_code, message, context)

class InvalidProductException(CustomException):
    def __init__(self, context: Optional[dict] = None) -> None:
        status_code = 400
        message = f'Product {context["productId"]} does not exist or is inactive'
        super().__init__(status_code, message, context)