def test_count_products(test_client, user_access_token):
    response = test_client.get('/products/count', headers = {'authorization': f'Bearer {user_access_token}'})
    assert response.status_code == 200
    assert isinstance(response.json()['count'], int)

def test_find_product_by_id(test_client, user_access_token, existing_product_id):
    response = test_client.get(f'/products/{existing_product_id}', headers = {'authorization': f'Bearer {user_access_token}'})
    assert response.status_code == 200
    assert response.json()['id'] == existing_product_id

def test_find_products(test_client, user_access_token):
    response = test_client.get('/products', headers = {'authorization': f'Bearer {user_access_token}'})
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_product(test_client, user_access_token, create_product_payload):
    response = test_client.post('/products', headers = {'authorization': f'Bearer {user_access_token}'}, json = create_product_payload)
    print(response.json())
    print(response.status_code)
    assert response.status_code == 403

def test_update_product(test_client, user_access_token, existing_product_id, update_product_payload):
    response = test_client.put(f'/products/{existing_product_id}', headers = {'authorization': f'Bearer {user_access_token}'}, json = update_product_payload)
    assert response.status_code == 403

def test_deactivate_product(test_client, user_access_token, existing_product_id):
    response = test_client.put(f'/products/deactivate/{existing_product_id}', headers = {'authorization': f'Bearer {user_access_token}'})
    assert response.status_code == 403

def test_activate_product(test_client, user_access_token, existing_product_id):
    response = test_client.put(f'/products/activate/{existing_product_id}', headers = {'authorization': f'Bearer {user_access_token}'})
    assert response.status_code == 403

def test_delete_product(test_client, user_access_token, existing_product_id):
    response = test_client.delete(f'/products/{existing_product_id}', headers = {'authorization': f'Bearer {user_access_token}'})
    assert response.status_code == 403