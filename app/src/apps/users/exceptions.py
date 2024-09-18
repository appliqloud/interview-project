from typing import Optional

from ...shared.exceptions import CustomException

class UserNotFoundException(CustomException):
    def __init__(self, context: Optional[dict] = None) -> None:
        status_code = 404
        message = f'User {context["userId"]} not found'
        super().__init__(status_code, message, context)