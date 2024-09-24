from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute, BinaryAttribute
from datetime import datetime
import os

class User(Model):
    class Meta:
        table_name = os.environ.get('AWS_DDB_TABLE_NAME')
        region = os.environ.get('AWS_REGION')

    PK = UnicodeAttribute(hash_key = True, default = 'USER')
    SK = UnicodeAttribute(range_key = True)
    _TYPE = UnicodeAttribute(default = 'USER')
    id = UnicodeAttribute()

    created_at = UTCDateTimeAttribute(attr_name = 'createdAt', default = datetime.now)
    updated_at = UTCDateTimeAttribute(attr_name = 'updatedAt', default = datetime.now, null = True)
    created_by = UnicodeAttribute(attr_name = 'createdBy', default = 'SYSTEM')
    updated_by = UnicodeAttribute(attr_name = 'updatedBy', default = 'SYSTEM', null = True)

    first_name = UnicodeAttribute(attr_name = 'firstName')
    last_name = UnicodeAttribute(attr_name = 'lastName')
    data_key = UnicodeAttribute(attr_name = 'dataKey')
    role = UnicodeAttribute()
    password_hash = BinaryAttribute(attr_name = 'passwordHash', legacy_encoding = False)