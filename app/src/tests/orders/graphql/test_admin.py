from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

from ....shared.graphql.schema import schema

def test_count_orders(admin_graphql_context):
    query = '''
            query {
                countOrders
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context)

    assert not result.errors
    assert 'countOrders' in result.data
    assert isinstance(result.data['countOrders'], int)

def test_find_order_by_id(admin_graphql_context, existing_order_id):
    query = '''
            query findOrderById($id: String!) {
                findOrderById(id: $id) {
                    __typename
                    ... on Order {
                        id
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'id': existing_order_id})

    assert not result.errors
    assert 'findOrderById' in result.data
    assert result.data['findOrderById']['__typename'] == 'Order'
    assert result.data['findOrderById']['id'] == existing_order_id

def test_find_orders(admin_graphql_context):
    query = '''
            query {
                findOrders {
                    id
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context)
    assert not result.errors
    assert 'findOrders' in result.data
    assert isinstance(result.data['findOrders'], list)

def test_mark_order_as_received(admin_graphql_context, existing_order_id):
    query = '''
            mutation markOrderAsReceived($id: String!) {
                markOrderAsReceived(id: $id) {
                    __typename
                    ... on Order {
                        id
                        status
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'id': existing_order_id})

    assert not result.errors
    assert 'markOrderAsReceived' in result.data
    assert result.data['markOrderAsReceived']['__typename'] == 'Order'
    assert result.data['markOrderAsReceived']['id'] == existing_order_id
    assert result.data['markOrderAsReceived']['status'] == 'RECEIVED'

def test_cancel_order(admin_graphql_context, existing_order_id):
    query = '''
            mutation cancelOrder($id: String!) {
                cancelOrder(id: $id) {
                    __typename
                    ... on Order {
                        id
                        status
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'id': existing_order_id})

    assert not result.errors
    assert 'cancelOrder' in result.data
    assert result.data['cancelOrder']['__typename'] == 'Order'
    assert result.data['cancelOrder']['id'] == existing_order_id
    assert result.data['cancelOrder']['status'] == 'CANCELLED'

def test_create_order(admin_graphql_context, create_order_payload):
    query = '''
            mutation createOrder($order: OrderInput!) {
                createOrder(order: $order) {
                    __typename
                    ... on Order {
                        id
                        status
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context, variable_values = {'order': create_order_payload})

    assert result.errors
    assert not result.data
    assert result.errors[0].message == 'User is not authorized to perform this action'