from typing import Optional

from ...shared.exceptions import CustomException

class ProductNotFoundException(CustomException):
    def __init__(self, context: Optional[dict] = None) -> None:
        status_code = 404
        message = f'Product {context["productId"]} not found'
        super().__init__(status_code, message, context)

class ProductAlreadyExistsException(CustomException):
    def __init__(self, context: Optional[dict] = None) -> None:
        status_code = 409
        message = f'Product {context["productId"]} already exists'
        super().__init__(status_code, message, context)