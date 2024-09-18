from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

import bcrypt

from ...src.apps.users.models import User as UserModel

id = input('Enter the user identifier: ')

try:
    UserModel.get('USER', f'USER#{id}')
    assert False, f'User {id} already exists'
except UserModel.DoesNotExist:
    pass

first_name = input('Enter the user first name: ')
last_name = input('Enter the user last name: ')
role = input('Enter the user role: ')

assert role in ['ADMIN', 'USER'], 'Invalid role'

password = input('Enter the user password: ')

password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
model = UserModel(SK = f'USER#{id}',
                  id = id,
                  first_name = first_name,
                  last_name = last_name,
                  role = role,
                  password_hash = password_hash)

model.save()
print(f'User {id} created successfully')