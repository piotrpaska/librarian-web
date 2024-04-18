from fastapi import APIRouter
from models.models import RentBase
from config.database import rentsCollection, historyCollection
from schemas.rent import serial_rents
from schemas.history import serial_history
from bson import ObjectId

router = APIRouter()

@router.get("/rent/")
async def get_rents():
    rents = serial_rents(rentsCollection.find())

    return rents

@router.post("/rent/")
async def add_rent(rent: RentBase):
    rentsCollection.insert_one(dict(rent))

@router.get("/history/")
async def get_history():
    rents = serial_history(historyCollection.find())

    return rents
    