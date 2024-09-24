import pytest
from decimal import Decimal
import uuid

@pytest.fixture(scope = 'module')
def product_id(dynamodb_table, admin_user_id, data_key):
    product_id = str(uuid.uuid4())
    dynamodb_table.put_item(Item = {'PK': f'DATA_KEY#{data_key}',
                                    'SK': f'PRODUCT#{product_id}',
                                    '_TYPE': 'PRODUCT',
                                    'id': product_id,
                                    'createdAt': '2024-01-01T00:00:00.000000+0000',
                                    'updatedAt': '2024-01-01T00:00:00.000000+0000',
                                    'createdBy': admin_user_id,
                                    'updatedBy': admin_user_id,
                                    'price': Decimal(100.00),
                                    'translations': [{'language': 'en', 'description': 'Test Product'},
                                                     {'language': 'es', 'description': 'Producto de prueba'}]})
    yield product_id
    dynamodb_table.delete_item(Key = {'PK': f'DATA_KEY#{data_key}', 'SK': f'PRODUCT#{product_id}'})

@pytest.fixture(scope = 'module')
def create_order_payload(product_id):
    return {'productId': product_id, 
            'quantity': 1}

@pytest.fixture(scope = 'module')
def existing_order_id(dynamodb_table, regular_user_id, data_key, product_id):

    order_id = str(uuid.uuid4())
    dynamodb_table.put_item(Item = {'PK': f'DATA_KEY#{data_key}',
                                    'SK': f'ORDER#{order_id}',
                                    '_TYPE': 'ORDER',
                                    'id': order_id,
                                    'createdAt': '2024-01-01T00:00:00.000000+0000',
                                    'updatedAt': '2024-01-01T00:00:00.000000+0000',
                                    'createdBy': regular_user_id,
                                    'updatedBy': regular_user_id,
                                    'productId': product_id,
                                    'quantity': 1,
                                    'status': 'PENDING',
                                    'total': Decimal(100.00)})
    yield order_id
    dynamodb_table.delete_item(Key = {'PK': f'DATA_KEY#{data_key}', 'SK': f'ORDER#{order_id}'})
