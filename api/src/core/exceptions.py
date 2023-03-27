""" (module) exceptions
This file contains exceptions to help give the user a detailed
explanation of what they did wrong or what went wrong
"""

__all__ = ("InvalidCamperCount",)

from fastapi import HTTPException


class InvalidCamperCount(HTTPException):
    def __init__(self, given: int, range: tuple[int, int]) -> None:
        status_code = 422
        detail = {
            "success": False,
            "detail": "Camper Count Failed Checks",
            "camper_count_provided": given,
            "tip": "Follow the criteria for camper count",
            "criteria": [f"Groups must be between {range[0]} and {range[1]} campers"],
        }

        super().__init__(status_code, detail)


class StringToSmall(HTTPException):
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
