from fastapi import Request
from fastapi.responses import JSONResponse
from typing import Optional
import uuid

class CustomException(Exception):
    def __init__(self, status_code: int, message: str, context: Optional[dict]) -> None:
        self.exception_case = self.__class__.__name__
        self.status_code = status_code
        self.message = message
        self.context = context

class InvalidTokenException(CustomException):
    def __init__(self, context: Optional[dict] = None) -> None:
        status_code = 401
        message = 'Invalid token'
        super().__init__(status_code, message, context)

class InvalidCredentialsException(CustomException):
    def __init__(self, context: Optional[dict] = None) -> None:
        status_code = 401
        message = 'Invalid credentials'
        super().__init__(status_code, message, context)

def custom_exception_handler(request: Request, exc: CustomException):
    trace_id = uuid.uuid4().hex
    print(f'{trace_id} - {exc.exception_case} - {exc.message} - {exc.context}')
    return JSONResponse(status_code = exc.status_code,
                        content = {'traceId': trace_id,
                                   'cause': exc.exception_case,
                                   'message': exc.message,
                                   'context': exc.context})