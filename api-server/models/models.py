from pydantic import BaseModel

class RentBase(BaseModel):
    name: str
    lastName: str
    schoolClass: str
    bookTitle: str
    deposit: str
    rentalDate: str
    maxDate: str