from typing import Optional

from .models import Product as ProductModel

def find_product_by_id(id: str) -> Optional[ProductModel]:
    try:
        return ProductModel.get('PRODUCT', f'PRODUCT#{id}')
    except ProductModel.DoesNotExist:
        return None