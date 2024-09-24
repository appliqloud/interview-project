from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

from app.src.shared.graphql.schema import schema

def test_count_products(user_graphql_context):
    query = '''
            query {
                countProducts
            }
            '''
    
    result = schema.execute_sync(query, context_value = user_graphql_context)

    assert not result.errors
    assert 'countProducts' in result.data
    assert isinstance(result.data['countProducts'], int)

def test_find_product_by_id(user_graphql_context, existing_product_id):
    query = '''
            query findProductById($id: String!) {
                findProductById(id: $id) {
                    __typename
                    ... on Product {
                        id
                    }
                    ... on Error {
                        cause
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = user_graphql_context, variable_values = {'id': existing_product_id})

    assert not result.errors
    assert 'findProductById' in result.data
    assert result.data['findProductById']['__typename'] == 'Product'
    assert result.data['findProductById']['id'] == existing_product_id

def test_find_products(user_graphql_context):
    query = '''
            query {
                findProducts {
                    id
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = user_graphql_context)
    assert not result.errors
    assert 'findProducts' in result.data
    assert isinstance(result.data['findProducts'], list)

def test_create_product(user_graphql_context, create_product_payload):
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
    
    result = schema.execute_sync(query, context_value = user_graphql_context, variable_values = {'product': create_product_payload})

    assert result.errors
    assert not result.data
    assert result.errors[0].message == 'User is not authorized to perform this action'

def test_update_product(user_graphql_context, existing_product_id, update_product_payload):
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
    
    result = schema.execute_sync(query, context_value = user_graphql_context, variable_values = {'id': existing_product_id, 'product': update_product_payload})

    assert result.errors
    assert not result.data
    assert result.errors[0].message == 'User is not authorized to perform this action'

def test_deactivate_product(user_graphql_context, existing_product_id):
    query = '''
            mutation deactivateProduct($id: String!) {
                deactivateProduct(id: $id) {
                    __typename
                    ... on Product {
                        id
                    }
                    ... on Error {
                        cause
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = user_graphql_context, variable_values = {'id': existing_product_id})

    assert result.errors
    assert not result.data
    assert result.errors[0].message == 'User is not authorized to perform this action'

def test_activate_product(user_graphql_context, existing_product_id):
    query = '''
            mutation activateProduct($id: String!) {
                activateProduct(id: $id) {
                    __typename
                    ... on Product {
                        id
                    }
                    ... on Error {
                        cause
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = user_graphql_context, variable_values = {'id': existing_product_id})

    assert result.errors
    assert not result.data
    assert result.errors[0].message == 'User is not authorized to perform this action'

def test_delete_product(user_graphql_context, existing_product_id):
    query = '''
            mutation deleteProduct($id: String!) {
                deleteProduct(id: $id) {
                    __typename
                    ... on Product {
                        id
                    }
                    ... on Error {
                        cause
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = user_graphql_context, variable_values = {'id': existing_product_id})

    assert result.errors
    assert not result.data
    assert result.errors[0].message == 'User is not authorized to perform this action'