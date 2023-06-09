""" (module) records
Classes/Models for records in the db
"""

__all__ = ("Record", "RecordAPI", "NewRecord")

from typing import Final

from fastapi import FastAPI
from tortoise import fields
from tortoise.models import Model
from pydantic import BaseModel, validator
from fastapi.middleware.cors import CORSMiddleware

from core import InvalidCamperCount, StringToSmall

# if there is more than the first index or greater than the second index it will raise an error
CAMPER_COUNT_RANGE: Final = (
    5,
    10,
)  # in the senario campers are between 5 - 10 so those are the numbers here
MIN_STRING = 3  # smallest value a string field eg name or location can be


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
        """
        This overwrites the default table name (the class name "Record")
         and sets it to "records" instead
        """

        table = "records"


class RecordAPI(FastAPI):
    """
    This is a subclass of fastapi.FastAPI
     It includes CORS support and metadata for the swagger docs
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
        cors_options = {
            "allow_origins": ["*"],
            "allow_methods": ["*"],
            "allow_headers": ["*"],
            "allow_credentials": True,
        }
        self.add_middleware(CORSMiddleware, **cors_options)


class NewRecord(BaseModel):
    """
    This class represents a new record in the database
     When someone creates a new record the attributes in this
     class is what the user must provide
    """

    name: str
    location: str
    weather: str
    camper_count: int

    @validator("camper_count")
    @classmethod
    def validate_camper_count(cls, camper_count: int) -> int:
        """
        Make sure there is not to less or to many campers

        Parameters:
            camper_count (int): This is the amount of campers

        Returns:
            int: The camper count if it passed vallidation

        Raises:
            InvalidCamperCount: If it failed to validate
        """

        start, stop = CAMPER_COUNT_RANGE
        if start <= camper_count <= stop:
            return camper_count

        # if there is to many campers raise this error
        raise InvalidCamperCount(camper_count, CAMPER_COUNT_RANGE)

    @validator("name", "location", "weather")
    @classmethod
    def validate_strings(cls, string: str) -> str:
        """
        Make sure that the string provided for name, location or weather is not too short

        Parameters:
            string (str): The string that will be validated

        Returns:
            str: If the string passed validation

        Raises:
            StringTooSmall: If the string is too small
        """

        if len(string) < MIN_STRING:
            raise StringToSmall(string, min_length=MIN_STRING)

        return string
