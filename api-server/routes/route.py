from fastapi import APIRouter
from models.models import RentBase
from config.database import rentsCollection
from schemas.rent import serial_rents
from bson import ObjectId

router = APIRouter()

@router.get("/rent/")
async def get_rents():
    rents = serial_rents(rentsCollection.find())

    return rents

@router.post("/rent/")
async def add_rent(rent: RentBase):
    rent = dict(rent)

    rentsCollection.insert_one(rent)

    return rent