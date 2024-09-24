import pytest
from fastapi.testclient import TestClient
import bcrypt
import boto3
import uuid
import os

from ..shared.graphql.permissions import GraphQLContext

from ...main import app

@pytest.fixture(scope = 'session')
def dynamodb_table():
    return boto3.resource('dynamodb', region_name = os.getenv('AWS_REGION')).Table(os.getenv('AWS_DDB_TABLE_NAME'))

@pytest.fixture(scope = 'session')
def data_key():
    return str(uuid.uuid4())

@pytest.fixture(scope = 'session')
def admin_user_password():
    return 'password'

@pytest.fixture(scope = 'session')
def admin_user_id(dynamodb_table, admin_user_password, data_key):
    user_id = str(uuid.uuid4())
    dynamodb_table.put_item(Item = {'PK': 'USER',
                                    'SK': f'USER#{user_id}',
                                    '_TYPE': 'USER',
                                    'id': user_id,
                                    'firstName': 'Test',
                                    'lastName': 'User',
                                    'isActive': True,
                                    'role': 'ADMIN',
                                    'dataKey': data_key,
                                    'passwordHash': bcrypt.hashpw(admin_user_password.encode('utf-8'), bcrypt.gensalt()),
                                    'createdAt': "2024-01-01T00:00:00.000000+0000",
                                    'updatedAt': "2024-01-01T00:00:00.000000+0000",
                                    'createdBy': 'TEST',
                                    'updatedBy': 'TEST'})
    yield user_id
    dynamodb_table.delete_item(Key = {'PK': 'USER', 'SK': f'USER#{user_id}'})

@pytest.fixture(scope = 'session')
def regular_user_password():
    return 'password'

@pytest.fixture(scope = 'session')
def regular_user_id(dynamodb_table, regular_user_password, data_key):
    user_id = str(uuid.uuid4())
    dynamodb_table.put_item(Item = {'PK': 'USER',
                                    'SK': f'USER#{user_id}',
                                    '_TYPE': 'USER',
                                    'id': user_id,
                                    'firstName': 'Test',
                                    'lastName': 'User',
                                    'isActive': True,
                                    'role': 'USER',
                                    'dataKey': data_key,
                                    'passwordHash': bcrypt.hashpw(regular_user_password.encode('utf-8'), bcrypt.gensalt()),
                                    'createdAt': "2024-01-01T00:00:00.000000+0000",
                                    'updatedAt': "2024-01-01T00:00:00.000000+0000",
                                    'createdBy': 'TEST',
                                    'updatedBy': 'TEST'})
    yield user_id
    dynamodb_table.delete_item(Key = {'PK': 'USER', 'SK': f'USER#{user_id}'})

@pytest.fixture(scope = 'session')
def admin_graphql_context(admin_user_id, data_key):
    return GraphQLContext(username = admin_user_id,
                          data_key = data_key,
                          role = 'ADMIN')

@pytest.fixture(scope = 'session')
def user_graphql_context(regular_user_id, data_key):
    return GraphQLContext(username = regular_user_id,
                          data_key = data_key,
                          role = 'USER')

@pytest.fixture(scope = 'session')
def test_client():
    return TestClient(app)

@pytest.fixture(scope = 'session')
def admin_access_token(test_client, admin_user_id, admin_user_password):
    response = test_client.post('/users/token', data = {'username': admin_user_id, 'password': admin_user_password})
    return response.json()['accessToken']

@pytest.fixture(scope = 'session')
def user_access_token(test_client, regular_user_id, regular_user_password):
    response = test_client.post('/users/token', data = {'username': regular_user_id, 'password': regular_user_password})
    return response.json()['accessToken']