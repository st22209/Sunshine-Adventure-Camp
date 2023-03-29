# Sunshine Valley Rest API

This is the API for the app. It manages all the data and records. It also handles all the backend logic for the app. This API can be hosted on a server so clients (the website in app/) can all access the same data.

The API is made using a framework called FastAPI. I chose this framework because I have a lot of experience with it and it lets me build api's fast.

The database choice was sqlite because its a locally stored file and means I dont need to spin up a server to host the database.  
I also decided to use an ORM for this project. That allowed me to not have to write and SQL code which makes the codebase more easier to understand for readers as now im using classes/objects instead.

## Directory Structure

Heres whats in each of the files/folders:
```bash
└── src # all source code for the api
    ├── core # the CORRREEE FOLDDDEEERRR ISSS THEE BEST FOLLDERR!!!
    │   ├── __init__.py 
    │   ├── exceptions.py # contains custom exceptions to be raised to the user
    │   ├── orm.py # code to startup the tortoise orm
    │   └── records.py # database models/schema, important classes, post validators
    ├── main.py # the script that starts the api
    ├── requirements.txt # requirements for someone who wants to run it
    ├── routes # contains endpoints for the api
    │   ├── __init__.py
    │   └── records.py # all the api's endpoints
    └── tests.py # unit tests and testing code
```