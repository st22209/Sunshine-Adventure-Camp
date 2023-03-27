""" (module) records
Endpoints for creating, deleting, updating, and getting records
"""

__all__ = ("records_endpoint",)

from typing import Optional

from fastapi import APIRouter, Request
from tortoise.contrib.pydantic import pydantic_model_creator  # type: ignore

from core import NewRecord, Record, InvalidRecordID


records_endpoint = APIRouter(
    tags=[
        "Records",
    ],
    prefix="/api/v1/records",
)


@records_endpoint.post("/")
async def create_new_record(request: Request, data: NewRecord):
    """
    This endpoint creates a new record in the database
    """

    await Record.create(
        name=data.name,
        location=data.location,
        weather=data.weather,
        camper_count=data.camper_count,
    )  # create a new record in the database
    return {"success": True, "detail": "Record created successfully!"}


@records_endpoint.delete("/")
async def delete_existing_record(request: Request, record_id: int):
    """
    This endpoint deletes an endpoint
    """

    exists = await Record.exists(id=record_id)
    if not exists:  # if the record doen't exist in the db
        raise InvalidRecordID

    await Record.filter(id=record_id).delete()  # delete the record
    return {"success": True, "detail": "Record deleted successfully!"}


@records_endpoint.get("/")
async def get_existing_record(
    request: Request, record_id: Optional[int] = None, convert_timestamp: bool = False
):
    """
    This endpoint gets and existing record from the database
    it can also get all the records from the db
    """
    record_pyd = pydantic_model_creator(Record, name="Record")

    if record_id is not None:
        exists = await Record.exists(id=record_id)
        if not exists:  # if the record doen't exist in the db
            raise InvalidRecordID

        record = await Record.get(id=record_id)
        if not convert_timestamp:  # if they chose not to convert the value
            # return it how it is
            return {"success": True, "record": record}

        # they chose to convert it
        converted_record = (await record_pyd.from_tortoise_orm(record)).dict()
        converted_record["timestamp"] = record.timestamp.timestamp() * 1000

        return {"success": True, "record": converted_record}

    all_db_records = await Record.all()
    if not convert_timestamp:
        # return normal records to the user (not converted)
        return {"success": True, "records": all_db_records}

    # they chose to covert it
    all_records = []
    for record in all_db_records:
        # convert all the timestamps from strings to timestamp integers
        # eg 2023-03-27T21:53:59.713817+13:00 -> 1679907239713
        conv_rec = (await record_pyd.from_tortoise_orm(record)).dict()
        conv_rec["timestamp"] = record.timestamp.timestamp() * 1000
        all_records.append(conv_rec)  # add to list of converted records

    # return converted records to the user
    return {"success": True, "records": all_records}
