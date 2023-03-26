""" (module) records
Endpoints for creating, deleting, updating, and getting records
"""

__all__ = ("records_endpoint",)

from typing import Optional

from fastapi import APIRouter, Request

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
async def get_existing_record(request: Request, record_id: Optional[int] = None):
    """
    This endpoint gets and existing record from the database
    it can also get all the records from the db
    """

    if record_id is not None:
        exists = await Record.exists(id=record_id)
        if not exists:  # if the record doen't exist in the db
            raise InvalidRecordID
        record = await Record.get(id=record_id)
        return {"success": True, "record": record}

    all_records = await Record.all()
    return {"success": True, "records": all_records}
