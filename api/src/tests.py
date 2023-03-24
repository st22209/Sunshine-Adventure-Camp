import os

from tortoise import run_async

from core.database import init_db


def test_db_creation() -> bool:
    """
    The purpose of this function is to test if the init_db
    function works. It will check if the db file is created

    Returns:
        bool: If the function worked it will return True else False
    """

    run_async(init_db())  # run the init function

    db_path = os.path.join(os.path.dirname(__file__), "core/database", "db.sqlite3")

    return os.path.exists(db_path)  # check if the init function worked


tests_to_run = [[test_db_creation, [], {}]]
for test, args, kwargs in tests_to_run:
    assert test(*args, **kwargs)
