"""
(module) records
Classes/Models for records in the db
"""

__all__ = ("Record", "RecordAPI", "NewRecord")

from fastapi import FastAPI
from tortoise import fields
from tortoise.models import Model
from pydantic import BaseModel, validator

from core import InvalidCamperCount

# camper count is between 5 and 10
# this constant is to validate that range
# if there is more than the first index or greater than the second index
# it will raise an error
CAMPER_COUNT_RANGE = (5, 10)


class Record(Model):
    """
    This class represents the records table in the database
    Its also shows what a single record would look like
    """

    id = fields.IntField(pk=True, generated=True)
    name = fields.TextField()
    location = fields.TextField()
    weather = fields.TextField()
    timestamp = fields.DatetimeField(auto_now_add=True)
    camper_count = fields.IntField()

    class Meta:
        table = "records"


class RecordAPI(FastAPI):
    """
    This is a subclass of fastapi.FastAPI
    """

    def __init__(self, version: str) -> None:
        super().__init__(
            title="Sunshine Adventure Camp",
            version=version,
            description="This is an internal API to be used with the sunshine adventure camp radio app",
            license_info={
                "name": "MIT",
                "url": "https://github.com/st22209/Sunshine-Adventure-Camp/blob/main/LICENSE",
            },
        )


class NewRecord(BaseModel):
    name: str
    location: str
    weather: str
    camper_count: int

    @validator("camper_count")
    @classmethod
    def validate_camper_count(cls, camper_count: int):
        start, stop = CAMPER_COUNT_RANGE
        if start <= camper_count <= stop:
            return camper_count
        raise InvalidCamperCount(camper_count, CAMPER_COUNT_RANGE)
