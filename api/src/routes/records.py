""" (module) records
Endpoints for creating, deleting, updating, and getting records
"""

__all__ = ("records_endpoint",)

import io
import csv
from typing import Optional
from datetime import datetime

from fastapi import APIRouter, Request
from fastapi.responses import PlainTextResponse
from tortoise.contrib.pydantic import pydantic_model_creator  # type: ignore

from core import NewRecord, Record, InvalidRecordID, InvalidDate


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
    request: Request,
    record_id: Optional[int] = None,
    convert_timestamp: bool = False,
    camper_name: Optional[str] = None,
    date: Optional[str] = None,
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
            return {"success": True, "record": record}

        # if they chose to convert it
        converted_record = (await record_pyd.from_tortoise_orm(record)).dict()
        converted_record["timestamp"] = record.timestamp.timestamp() * 1000

        return {"success": True, "record": converted_record}

    if camper_name is not None:
        all_db_records = (
            await Record.all().order_by("timestamp").filter(name=camper_name)
        )
    else:
        all_db_records = await Record.all().order_by("timestamp")

    if date is not None:
        try:
            search_date = datetime.strptime(date, "%d/%m")
        except ValueError:
            raise InvalidDate
        all_db_records = list(
            filter(
                lambda record: all(
                    [
                        record.timestamp.day == search_date.day,
                        record.timestamp.month == search_date.month,
                    ]
                ),
                all_db_records,
            )
        )

    if not convert_timestamp:
        # return normal records to the user (not converted)
        return {"success": True, "records": all_db_records}

    all_records = []
    for record in all_db_records:
        # convert all the timestamps from strings to timestamp integers
        # eg 2023-03-27T21:53:59.713817+13:00 -> 1679907239713
        conv_rec = (await record_pyd.from_tortoise_orm(record)).dict()
        conv_rec["timestamp"] = record.timestamp.timestamp() * 1000
        all_records.append(conv_rec)  # add to list of converted records

    # return converted records to the user
    return {"success": True, "records": all_records}


@records_endpoint.patch("/")
async def update_existing_record(request: Request, record_id: int, new_data: dict):
    """
    This endpoint updates an already existing record in the database with new data
    """

    record = await Record.get(id=record_id)
    if record is None:  # record doesnt exist
        raise InvalidRecordID

    update_data = {}

    attrs = ["name", "location", "weather", "camper_count"]
    for attr, new_val in new_data.items():
        if attr not in attrs:
            continue

        attrs.remove(attr)
        update_data[attr] = new_val

    # validate the new data
    NewRecord(**update_data, **{attr: getattr(record, attr) for attr in attrs})

    # if it passed validation update the db
    record.update_from_dict(update_data)
    await record.save()

    return {"success": True, "detail": "The record has been updated!"}


@records_endpoint.get("/export")
async def export_data_to_csv(request: Request, convert_timestamp: bool = False):
    """
    This endpoint exports the database to a csv and returns it as a downloadable file
    """

    record_pyd = pydantic_model_creator(Record, name="Record")

    all_db_records = await Record.all().order_by("timestamp")
    all_records = []

    for record in all_db_records:
        conv_rec = (await record_pyd.from_tortoise_orm(record)).dict()
        if convert_timestamp:
            conv_rec["timestamp"] = record.timestamp.timestamp() * 1000
        all_records.append(conv_rec)

    # write data to csv:
    export_file = io.StringIO()  # in memory buffer
    keys = all_records[0].keys()

    dict_writer = csv.DictWriter(export_file, keys)
    dict_writer.writeheader()
    dict_writer.writerows(all_records)  # write data

    # return as file
    return PlainTextResponse(export_file.getvalue(), media_type="text/csv")
