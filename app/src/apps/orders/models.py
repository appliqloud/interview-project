from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute, NumberAttribute
from pynamodb.indexes import GlobalSecondaryIndex, AllProjection
from datetime import datetime
import os

class TypeIndex(GlobalSecondaryIndex):
    class Meta:
        projection = AllProjection()
        index_name = '_TYPE-index'

    _TYPE = UnicodeAttribute(hash_key = True)
    created_at = UTCDateTimeAttribute(range_key = True, attr_name = 'createdAt')

class Order(Model):
    class Meta:
        table_name = os.environ.get('AWS_DDB_TABLE_NAME')
        region = os.environ.get('AWS_REGION')

    PK = UnicodeAttribute(hash_key = True)
    SK = UnicodeAttribute(range_key = True)
    _TYPE = UnicodeAttribute(default = 'ORDER')
    type_index = TypeIndex()
    id = UnicodeAttribute()

    created_at = UTCDateTimeAttribute(attr_name = 'createdAt', default = datetime.now)
    updated_at = UTCDateTimeAttribute(attr_name = 'updatedAt', default = datetime.now, null = True)
    created_by = UnicodeAttribute(attr_name = 'createdBy', default = 'SYSTEM')
    updated_by = UnicodeAttribute(attr_name = 'updatedBy', default = 'SYSTEM', null = True)

    status = UnicodeAttribute()
    product_id = UnicodeAttribute(attr_name = 'productId')
    quantity = NumberAttribute()
    total = NumberAttribute()