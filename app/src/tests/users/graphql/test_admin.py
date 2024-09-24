from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv())

from ....shared.graphql.schema import schema

def test_me(admin_graphql_context):
    query = '''
            query {
                me {
                    __typename
                    ... on User {
                        id
                        role
                    }
                }
            }
            '''
    
    result = schema.execute_sync(query, context_value = admin_graphql_context)

    assert not result.errors
    assert 'me' in result.data
    assert result.data['me']['__typename'] == 'User'
    assert result.data['me']['id'] == admin_graphql_context.username
    assert result.data['me']['role'] == admin_graphql_context.role