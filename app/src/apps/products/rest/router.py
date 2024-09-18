from fastapi import APIRouter, Body, Path, Depends, status
from typing import Annotated

from .schemas import ProductCount, Product, CreateProductInput, UpdateProductInput
from .service import ProductService as svc
from ....shared.rest.permissions import RESTContext
from ....shared.dependencies import get_rest_context

router = APIRouter()

@router.get('/count',
            status_code = status.HTTP_200_OK,
            response_model = ProductCount)
def count_products(context: Annotated[RESTContext, Depends(get_rest_context)]) -> ProductCount:
    return svc(context).count_products()

@router.get('/{id}',
            status_code = status.HTTP_200_OK,
            response_model = Product)
def find_product_by_id(context: Annotated[RESTContext, Depends(get_rest_context)],
                       id: Annotated[str, Path(...)]) -> Product:
    return svc(context).find_product_by_id(id)

@router.get('/',
            status_code = status.HTTP_200_OK,
            response_model = list[Product])
def find_products(context: Annotated[RESTContext, Depends(get_rest_context)]) -> list[Product]:
    return svc(context).find_products()

@router.post('/',
             status_code = status.HTTP_201_CREATED,
             response_model = Product)
def create_product(context: Annotated[RESTContext, Depends(get_rest_context)],
                   product: Annotated[CreateProductInput, Body(...)]) -> Product:
    return svc(context).create_product(product)

@router.put('/{id}',
            status_code = status.HTTP_200_OK,
            response_model = Product)
def update_product(context: Annotated[RESTContext, Depends(get_rest_context)],
                   id: Annotated[str, Path(...)],
                   product: Annotated[UpdateProductInput, Body(...)]) -> Product:
    return svc(context).update_product(id, product)

@router.put('/deactivate/{id}',
            status_code = status.HTTP_200_OK,
            response_model = Product)
def deactivate_product(context: Annotated[RESTContext, Depends(get_rest_context)],
                       id: Annotated[str, Path(...)]) -> Product:
    return svc(context).deactivate_product(id)

@router.put('/activate/{id}',
            status_code = status.HTTP_200_OK,
            response_model = Product)
def activate_product(context: Annotated[RESTContext, Depends(get_rest_context)],
                     id: Annotated[str, Path(...)]) -> Product:
    return svc(context).activate_product(id)

@router.delete('/{id}',
               status_code = status.HTTP_200_OK,
               response_model = Product)
def delete_product(context: Annotated[RESTContext, Depends(get_rest_context)],
                   id: Annotated[str, Path(...)]) -> Product:
    return svc(context).delete_product(id)