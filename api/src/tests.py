import os
import sqlite3

from tortoise import run_async

from core import init_db


def test_db_creation() -> bool:
    """
    The purpose of this function is to test if the init_db function works.
    It will check if the db file is created and all the tables are there.

    Returns:
        bool: If the function worked it will return True else False
    """

    run_async(init_db())  # run the init function

    # test if the file exists
    db_path = os.path.join(os.path.dirname(__file__), "core/database", "db.sqlite3")
    if not os.path.exists(db_path):
        return False

    # test if all tables have been created
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    cursor.execute(
        "SELECT name FROM sqlite_master WHERE type='table' AND name=?", ("records",)
    )
    data = cursor.fetchall()
    connection.close()
    if not data:
        return False

    return True


tests_to_run = [[test_db_creation, [], {}]]
for test, args, kwargs in tests_to_run:
    assert test(*args, **kwargs)
