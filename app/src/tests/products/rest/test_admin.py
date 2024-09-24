def test_count_products(test_client, admin_access_token):
    response = test_client.get('/products/count', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert isinstance(response.json()['count'], int)

def test_create_product(test_client, admin_access_token, create_product_payload):
    response = test_client.post('/products', headers = {'authorization': f'Bearer {admin_access_token}'}, json = create_product_payload)
    assert response.status_code == 201
    assert response.json()['id'] == create_product_payload['id']
    assert response.json()['isActive'] == True
    assert response.json()['price'] == create_product_payload['price']
    assert response.json()['translations'] == create_product_payload['translations']

def test_find_product_by_id(test_client, admin_access_token, product_id):
    response = test_client.get(f'/products/{product_id}', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert response.json()['id'] == product_id

def test_update_product(test_client, admin_access_token, product_id, update_product_payload):
    response = test_client.put(f'/products/{product_id}', headers = {'authorization': f'Bearer {admin_access_token}'}, json = update_product_payload)
    assert response.status_code == 200
    assert response.json()['id'] == product_id
    assert response.json()['price'] == update_product_payload['price']
    assert response.json()['translations'] == update_product_payload['translations']

def test_find_products(test_client, admin_access_token):
    response = test_client.get('/products', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_deactivate_product(test_client, admin_access_token, product_id):
    response = test_client.put(f'/products/deactivate/{product_id}', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert response.json()['id'] == product_id
    assert response.json()['isActive'] == False

def test_activate_product(test_client, admin_access_token, product_id):
    response = test_client.put(f'/products/activate/{product_id}', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert response.json()['id'] == product_id
    assert response.json()['isActive'] == True
    
def test_delete_product(test_client, admin_access_token, product_id):
    response = test_client.delete(f'/products/{product_id}', headers = {'authorization': f'Bearer {admin_access_token}'})
    assert response.status_code == 200
    assert response.json()['id'] == product_id
