""" (module) exceptions
This file contains exceptions to help give the user a detailed
explanation of what they did wrong or what went wrong
"""

__all__ = ("InvalidCamperCount", "InvalidRecordID", "StringToSmall", "InvalidDate")

from fastapi import HTTPException


class InvalidCamperCount(HTTPException):
    """
    This exception is raised when a user enters an invalid camper count
    for example the camper count range is between 5 and 10 campers
    if the user were to provide an input of 12 campers, this exception would be raised
    """

    def __init__(self, given: int, range: tuple[int, int]) -> None:
        status_code = 422

        smallest, largest = range
        detail = {
            "success": False,
            "detail": "Camper Count Failed Checks",
            "camper_count_provided": given,
            "tip": "Follow the criteria for camper count",
            "criteria": f"Groups must be between {smallest} and {largest} campers",
        }

        super().__init__(status_code, detail)


class StringToSmall(HTTPException):
    """
    This exception is raised when a user enters a string that is too short
     i mean average sized
    """

    def __init__(self, given: str, min_length: int) -> None:
        status_code = 422
        detail = {
            "success": False,
            "detail": "One of the string's you provided failed checks",
            "provided_value": given,
            "tip": "Follow the criteria bellow",
            "criteria": f"Strings must be more than {min_length} characters!",
        }

        super().__init__(status_code, detail)


class InvalidRecordID(HTTPException):
    """
    This exception is raised when a user requests that does not exist in the database
     Each record has an id, so when a user searches for a record with a specific id
      and that record in not in the database, this exception is raised
    """

    def __init__(
        self,
    ) -> None:
        status_code = 404
        detail = {
            "success": False,
            "detail": "The record you are trying to get does not exist",
            "tip": "Recheck the id you provided to make sure no typos",
        }
        super().__init__(status_code, detail)


class InvalidDate(HTTPException):
    """
    This exception is raised when an invalid date is provided, or the date is not in the correct format
     For example someone enters the date in format m/d which is an inferior format, *COUGH* *COUGH* USA
      Then this exception is raised to tell them that they are wrong and to get better
    """

    def __init__(
        self,
    ) -> None:
        status_code = 404
        detail = {
            "success": False,
            "detail": "The date provided is an invalid date it must be in format: d/m",
            "tip": "Format: dd/mm. Example: 29/03",
        }
        super().__init__(status_code, detail)
