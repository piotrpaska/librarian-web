from fastapi import APIRouter
from models.models import RentBase
from config.database import rentsCollection, historyCollection
from schemas.rent import serial_rents
from schemas.history import serial_history
from bson import ObjectId
import datetime

router = APIRouter()

@router.get("/rent/")
async def get_rents():
    rents = serial_rents(rentsCollection.find())

    return rents

@router.post("/rent/")
async def add_rent(rent: RentBase):
    rentsCollection.insert_one(dict(rent))

@router.delete("/rent/{id}")
async def delete_rent(id: str):
    print(id)
    if id == 'null':
        return {'status': 422}
    todayDate = datetime.datetime.now().strftime("%Y-%m-%d")
    print(todayDate)
    rent = rentsCollection.find_one({'_id': ObjectId(id)})
    rent['returnDate'] = todayDate
    historyCollection.insert_one(rent)
    rentsCollection.delete_one({'_id': ObjectId(id)})

@router.get("/history/")
async def get_history():
    rents = serial_history(historyCollection.find())

    return rents
    