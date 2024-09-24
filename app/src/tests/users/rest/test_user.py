def test_me(test_client, user_access_token):
    response = test_client.get('/users/me', headers = {'Authorization': f'Bearer {user_access_token}'})
    assert response.status_code == 200
    assert response.json()['role'] == 'USER'
    