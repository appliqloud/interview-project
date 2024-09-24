from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

from app.src.shared.graphql.schema import schema

def test_count_products(admin_graphql_context):
    query = '''
            query {
                countProducts
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context)

    assert not result.errors
    assert 'countProducts' in result.data
    assert isinstance(result.data['countProducts'], int)

def test_create_product(admin_graphql_context, create_product_payload):
    query = '''
            mutation createProduct($product: CreateProductInput!) {
                createProduct(product: $product) {
                    __typename
                    ... on Product{
                        id
                        price
                        translations {
                            language
                            description
                        }
                    }
                    ... on Error {
                        cause
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'product': create_product_payload})

    assert not result.errors
    assert 'createProduct' in result.data
    assert result.data['createProduct']['__typename'] == 'Product'
    assert result.data['createProduct']['id'] == create_product_payload['id']
    assert result.data['createProduct']['price'] == create_product_payload['price']
    assert result.data['createProduct']['translations'] == create_product_payload['translations']

def test_find_product_by_id(admin_graphql_context, product_id):
    query = '''
            query findProductById($id: String!) {
                findProductById(id: $id) {
                    __typename
                    ... on Product {
                        id
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'id': product_id})

    assert not result.errors
    assert 'findProductById' in result.data
    assert result.data['findProductById']['__typename'] == 'Product'
    assert result.data['findProductById']['id'] == product_id

def test_find_products(admin_graphql_context):
    query = '''
            query {
                findProducts {
                    id
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context)
    assert not result.errors
    assert 'findProducts' in result.data
    assert isinstance(result.data['findProducts'], list)

def test_update_product(admin_graphql_context, product_id, update_product_payload):
    query = '''
            mutation updateProduct($id: String!, $product: UpdateProductInput!) {
                updateProduct(id: $id, product: $product) {
                    __typename
                    ... on Product {
                        id
                        price
                        translations {
                            language
                            description
                        }
                    }
                    ... on Error {
                        cause
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'id': product_id, 'product': update_product_payload})

    assert not result.errors
    assert 'updateProduct' in result.data
    assert result.data['updateProduct']['__typename'] == 'Product'
    assert result.data['updateProduct']['id'] == product_id
    assert result.data['updateProduct']['price'] == update_product_payload['price']
    assert result.data['updateProduct']['translations'] == update_product_payload['translations']

def test_deactivate_product(admin_graphql_context, product_id):
    query = '''
            mutation deactivateProduct($id: String!) {
                deactivateProduct(id: $id) {
                    __typename
                    ... on Product {
                        id
                        isActive
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'id': product_id})

    assert not result.errors
    assert 'deactivateProduct' in result.data
    assert result.data['deactivateProduct']['__typename'] == 'Product'
    assert result.data['deactivateProduct']['id'] == product_id
    assert result.data['deactivateProduct']['isActive'] == False

def test_activate_product(admin_graphql_context, product_id):
    query = '''
            mutation activateProduct($id: String!) {
                activateProduct(id: $id) {
                    __typename
                    ... on Product {
                        id
                        isActive
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'id': product_id})

    assert not result.errors
    assert 'activateProduct' in result.data
    assert result.data['activateProduct']['__typename'] == 'Product'
    assert result.data['activateProduct']['id'] == product_id
    assert result.data['activateProduct']['isActive'] == True

def test_delete_product(admin_graphql_context, product_id):
    query = '''
            mutation deleteProduct($id: String!) {
                deleteProduct(id: $id) {
                    __typename
                    ... on Product {
                        id
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'id': product_id})

    assert not result.errors
    assert 'deleteProduct' in result.data
    assert result.data['deleteProduct']['__typename'] == 'Product'
    assert result.data['deleteProduct']['id'] == product_id