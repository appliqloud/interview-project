from typing import Optional

from .models import Product as ProductModel

from ...shared.graphql.permissions import GraphQLContext
from ...shared.rest.permissions import RESTContext

def find_product_by_id(context: GraphQLContext | RESTContext, id: str) -> Optional[ProductModel]:
    try:
        return ProductModel.get(f'DATA_KEY#{context.data_key}', f'PRODUCT#{id}')
    except ProductModel.DoesNotExist:
        return None