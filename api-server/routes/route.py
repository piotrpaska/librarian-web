from fastapi import APIRouter
from models.models import RentBase, EditRentBase
from config.database import rentsCollection, historyCollection, booksCollection
from schemas.rent import serial_rents
from schemas.history import serial_history
from schemas.book import serial_books
import datetime
from bson import ObjectId
from colorama import Fore, Style, init

init(autoreset=True)

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
    if id == 'null':
        return {'status': 422}
    todayDate = datetime.datetime.now().strftime("%Y-%m-%d")
    rent = rentsCollection.find_one({'_id': ObjectId(id)})
    rent['returnDate'] = todayDate
    historyCollection.insert_one(rent)
    rentsCollection.delete_one({'_id': ObjectId(id)})

@router.get("/history/")
async def get_history():
    rents = serial_history(historyCollection.find())

    return rents

@router.get("/one-rent/{id}")
async def get_one_rent(id: str):
    def prepareRentData(rent):
        return {
        'id': str(rent['_id']),
        'name': rent['name'],
        'lastName': rent['lastName'],
        'schoolClass': rent['schoolClass'],
        'bookCode': rent['bookCode'],
        'deposit': rent['deposit'],
        'rentDate': rent['rentDate'],
        'dueDate': rent['dueDate'],
        'isLongRent': rent['isLongRent']
    }

    rent = rentsCollection.find_one({'_id': ObjectId(id)})
    rent = prepareRentData(rent)
    return rent

@router.put("/rent/{id}")
def update_rent(id: str, rent: EditRentBase):
    rentsCollection.update_one({'_id': ObjectId(id)}, {'$set': dict(rent)})

@router.get("/books/")
async def get_books():
    books = serial_books(booksCollection.find())

    return books

@router.get("/book-rent/{code}")
async def rented_book(code: str):
    book = booksCollection.find_one({'code': code})
    booksCollection.update_one({'code': code}, {'$set': {'onStock': book['onStock'] - 1, 'rented': book['rented'] + 1}})

@router.get("/book-return/{code}")
async def return_book(code: str):
    book = booksCollection.find_one({'code': code})
    booksCollection.update_one({'code': code}, {'$set': {'onStock': book['onStock'] + 1, 'rented': book['rented'] - 1}})

@router.get("/book/{code}")
async def get_one_book(code: str):

    def prepareBookData(book):
        return {
            'code': book['code'],
            'title': book['title'],
            'onStock': book['onStock'],
            'rented': book['rented']
        }
    book = booksCollection.find_one({'code': code})
    book = prepareBookData(book)
    return dict(book)
