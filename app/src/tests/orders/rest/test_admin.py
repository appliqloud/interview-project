def test_count_orders(test_client, admin_access_token):
    response = test_client.get('/orders/count', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert isinstance(response.json()['count'], int)

def test_find_order_by_id(test_client, admin_access_token, existing_order_id):
    response = test_client.get(f'/orders/{existing_order_id}', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert response.json()['id'] == existing_order_id

def test_find_orders(test_client, admin_access_token):
    response = test_client.get('/orders', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_mark_order_as_received(test_client, admin_access_token, existing_order_id):
    response = test_client.put(f'/orders/receive/{existing_order_id}', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert response.json()['id'] == existing_order_id
    assert response.json()['status'] == 'RECEIVED'

def test_cancel_order(test_client, admin_access_token, existing_order_id):
    response = test_client.put(f'/orders/cancel/{existing_order_id}', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert response.json()['id'] == existing_order_id
    assert response.json()['status'] == 'CANCELLED'
    
def test_create_order(test_client, admin_access_token, create_order_payload):
    response = test_client.post('/orders', json = create_order_payload, headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 403