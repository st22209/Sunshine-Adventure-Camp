""" (module)
Endpoints for creating, deleting, updating, and getting records
"""

__all__ = ("records_endpoint",)

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
    await Record.create(
        name=data.name,
        location=data.location,
        weather=data.weather,
        camper_count=data.camper_count,
    )
    return {"success": True, "detail": "Record created successfully!"}


@records_endpoint.delete("/")
async def delete_existing_record(request: Request, record_id: int):
    exists = await Record.exists(id=record_id)
    if not exists:
        raise InvalidRecordID
    await Record.filter(id=record_id).delete()
    return {"success": True, "detail": "Record deleted successfully!"}
