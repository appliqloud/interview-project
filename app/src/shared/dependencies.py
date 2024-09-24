from fastapi import Header, Depends
from typing import Annotated
import jwt
import os

from .exceptions import InvalidTokenException
from .graphql.permissions import GraphQLContext
from .rest.permissions import RESTContext

def get_graphql_context(authorization: Annotated[str, Header()]) -> GraphQLContext:
        if not authorization:
            raise InvalidTokenException({'error': 'No token provided'})
        try:
            authorization_type, authorization = authorization.split(' ')
        except ValueError:
            raise InvalidTokenException({'error': 'Invalid token format: token must be in the format "Bearer <token>"'})
        
        if authorization_type == 'Bearer':
            try:
                claims = jwt.decode(authorization,
                                    os.getenv('JWT_SECRET_KEY'),
                                    algorithms = [os.getenv('JWT_ALGORITHM')])
                return GraphQLContext(username = claims['sub'],
                                      data_key = claims['dataKey'],
                                      role = claims['role'])
            except jwt.ExpiredSignatureError:
                raise InvalidTokenException({'error': 'Token has expired'})
            except jwt.InvalidTokenError:
                raise InvalidTokenException({'error': 'Token is invalid'})
            except KeyError:
                raise InvalidTokenException({'error': 'Token is missing required claims'})
        raise InvalidTokenException({'error': 'Token type not supported'})

def get_rest_context(authorization: Annotated[str, Header()]) -> RESTContext:
    if not authorization:
        raise InvalidTokenException({'error': 'No token provided'})
    try:
        authorization_type, authorization = authorization.split(' ')
    except ValueError:
        raise InvalidTokenException({'error': 'Invalid token format: token must be in the format "Bearer <token>"'})
    
    if authorization_type == 'Bearer':
        try:
            claims = jwt.decode(authorization,
                                os.getenv('JWT_SECRET_KEY'),
                                algorithms = [os.getenv('JWT_ALGORITHM')])
            return RESTContext(username = claims['sub'],
                               data_key = claims['dataKey'],
                               role = claims['role'])
        except jwt.ExpiredSignatureError:
            raise InvalidTokenException({'error': 'Token has expired'})
        except jwt.InvalidTokenError:
            raise InvalidTokenException({'error': 'Token is invalid'})
        except KeyError:
            raise InvalidTokenException({'error': 'Token is missing required claims'})
    raise InvalidTokenException({'error': 'Token type not supported'})

async def get_context(context: Annotated[GraphQLContext, Depends(get_graphql_context)]) -> GraphQLContext:
    return context