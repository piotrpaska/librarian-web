from pydantic import BaseModel

class RentBase(BaseModel):
    name: str
    lastName: str
    schoolClass: str
    bookCode: str
    deposit: str
    rentDate: str
    dueDate: str
    isLongRent: bool