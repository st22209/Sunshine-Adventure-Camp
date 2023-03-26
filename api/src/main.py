""" (script) main
This script starts up the API
"""

__version__ = "0.0.1"
__author__ = ["FusionSid"]

import uvicorn
from fastapi import Request
from fastapi.responses import RedirectResponse

from core import init_db, RecordAPI
from routes import records_endpoint


app = RecordAPI(__version__)
app.include_router(router=records_endpoint)


@app.on_event("startup")
async def startup_event() -> None:
    """
    Runs on startup and initilizes the database
    """

    await init_db()


@app.route("/")
def redirect_to_docs(request: Request) -> RedirectResponse:
    """
    Redirect user to docs when they go to base url
    """

    return RedirectResponse("/docs")


if __name__ == "__main__":
    options = {"app": "main:app", "port": 8443}
    uvicorn.run(**options)  # startup the api with the above options
