from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

from fastapi import FastAPI

from .src.shared.graphql.schema import router as graphql_router
from .src.shared.rest.router import router as rest_router
from .src.shared.exceptions import CustomException, custom_exception_handler

app = FastAPI()

@app.exception_handler(CustomException)
def custom_exception_handler_wrapper(request, exc):
    return custom_exception_handler(request, exc)

app.include_router(graphql_router, prefix = '/graphql')
app.include_router(rest_router)
