from tortoise import fields
from tortoise.models import Model


class Record(Model):
    id = fields.IntField(pk=True, generated=True)
    name = fields.TextField()
    location = fields.TextField()
    weather = fields.TextField()
    timestamp = fields.DatetimeField(auto_now_add=True)
    camper_count = fields.IntField()

    class Meta:
        table = "records"
