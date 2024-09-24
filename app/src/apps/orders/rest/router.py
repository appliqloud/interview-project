from fastapi import APIRouter, Body, Path, Depends, status
from typing import Annotated

from .schemas import Order, OrderInput, OrderCount
from .service import OrderService as svc

from ....shared.rest.permissions import RESTContext, Authorization
from ....shared.dependencies import get_rest_context

router = APIRouter()

@router.get('/count',
            status_code = status.HTTP_200_OK,
            response_model = OrderCount)
def count_orders(context: Annotated[RESTContext, Depends(get_rest_context)]) -> int:
    if Authorization('ORDERS', 'READ').has_permission(context):
        return svc(context).count_orders()

@router.get('/{id}', 
            status_code = status.HTTP_200_OK,
            response_model = Order)
def find_order_by_id(context: Annotated[RESTContext, Depends(get_rest_context)],
                     id: Annotated[str, Path(...)]) -> Order:
    if Authorization('ORDERS', 'READ').has_permission(context):
        return svc(context).find_order_by_id(id)

@router.get('/',
            status_code = status.HTTP_200_OK,
            response_model = list[Order])
def find_orders(context: Annotated[RESTContext, Depends(get_rest_context)]) -> list[Order]:
    if Authorization('ORDERS', 'READ').has_permission(context):
        return svc(context).find_orders()

@router.post('/',
             status_code = status.HTTP_201_CREATED,
             response_model = Order)
def create_order(context: Annotated[RESTContext, Depends(get_rest_context)],
                 order: Annotated[OrderInput, Body(...)]) -> Order:
    if Authorization('ORDERS', 'CREATE').has_permission(context):
        return svc(context).create_order(order)

@router.put('/cancel/{id}',
            status_code = status.HTTP_200_OK,
            response_model = Order)
def cancel_order(context: Annotated[RESTContext, Depends(get_rest_context)],
                 id: Annotated[str, Path(...)]) -> Order:
    if Authorization('ORDERS', 'CANCEL').has_permission(context):
        return svc(context).cancel_order(id)

@router.put('/receive/{id}',
            status_code = status.HTTP_200_OK,
            response_model = Order)
def mark_order_as_received(context: Annotated[RESTContext, Depends(get_rest_context)],
                           id: Annotated[str, Path(...)]) -> Order:
    if Authorization('ORDERS', 'MARK_AS_RECEIVED').has_permission(context):
        return svc(context).mark_order_as_received(id)
