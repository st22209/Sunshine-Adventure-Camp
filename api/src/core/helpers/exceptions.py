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
            "criteria": [
                f"Groups are always between {range[0]} and {range[1]} campers"
            ],
        }

        super().__init__(status_code, detail)
