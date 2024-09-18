from fastapi import APIRouter

from ...apps.orders.rest.router import router as orders_router
from ...apps.products.rest.router import router as products_router
from ...apps.users.rest.router import router as users_router

router = APIRouter()

router.include_router(orders_router, prefix = '/orders')
router.include_router(products_router, prefix = '/products')
router.include_router(users_router, prefix = '/users')