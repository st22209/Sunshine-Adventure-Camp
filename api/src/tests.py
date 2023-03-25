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
    db_path = os.path.join(os.path.dirname(__file__), "core", "db.sqlite3")
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


def test_validation() -> None:
    CAMPER_COUNT_RANGE = (5, 10)

    def validate_camper_count(camper_count: int):
        start, stop = CAMPER_COUNT_RANGE
        if start <= camper_count <= stop:
            return True
        return False

    for i in range(0, 20):
        fres = validate_camper_count(i)
        if i in range(CAMPER_COUNT_RANGE[0], CAMPER_COUNT_RANGE[1] + 1):
            assert fres
        else:
            assert not fres


assert test_db_creation()
test_validation()
