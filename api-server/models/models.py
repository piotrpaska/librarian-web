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

class EditRentBase(BaseModel):
    name: str
    lastName: str
    schoolClass: str
    deposit: str
    rentDate: str
    dueDate: str
    isLongRent: bool