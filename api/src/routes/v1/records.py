""" (module)
Endpoints for creating, deleting, updating, and getting records
"""

__all__ = ("records_endpoint",)

from fastapi import APIRouter

records_endpoint = APIRouter(
    tags=[
        "Records",
    ],
    prefix="/api/v1/records",
)
