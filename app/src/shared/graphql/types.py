import strawberry
from strawberry.scalars import JSON
from typing import Optional

from ..exceptions import CustomException

@strawberry.type
class Error:
    status_code: int
    cause: str
    message: str
    context: Optional[JSON] = None

    @classmethod
    def from_exception(cls, exc: CustomException) -> 'Error':
        return cls(status_code = exc.status_code,
                   cause = exc.exception_case,
                   message = exc.message,
                   context = exc.context)