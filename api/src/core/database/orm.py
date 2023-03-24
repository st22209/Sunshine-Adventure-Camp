"""(module) orm
The purpose of this file is to provide utility functions
to use with tortoise orm sqlite3 database
"""

import os
from tortoise import Tortoise

# path to where the database file will be stored
DB_PATH = os.path.join(os.path.dirname(__file__), "db.sqlite3")


async def init_db() -> None:
    """
    This function sets up the database and creates
      the tables if they aren't already created
    """

    await Tortoise.init(
        db_url=f"sqlite://{DB_PATH}",
        modules={"models": ["core.models.records"]},
        timezone="NZ",
    )
    await Tortoise.generate_schemas()
