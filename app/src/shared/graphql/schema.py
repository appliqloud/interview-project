import strawberry
from strawberry.fastapi import GraphQLRouter
from strawberry.tools import merge_types

from ...apps.orders.graphql.query import Query as OrdersQuery
from ...apps.orders.graphql.mutation import Mutation as OrdersMutation

from ...apps.products.graphql.query import Query as ProductsQuery
from ...apps.products.graphql.mutation import Mutation as ProductsMutation

from ...apps.users.graphql.query import Query as UsersQuery

from ..dependencies import get_context

queries = (OrdersQuery,
           ProductsQuery,
           UsersQuery)

mutations = (OrdersMutation,
             ProductsMutation)

schema = strawberry.Schema(query = merge_types('Query', queries),
                           mutation = merge_types('Mutation', mutations))

router = GraphQLRouter(schema = schema,
                       context_getter = get_context)