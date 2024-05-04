from pymongo import MongoClient

client = MongoClient("mongodb+srv://librarianWeb:3W6MO4tXfebbTeXX@librarian.3akhsbc.mongodb.net/?retryWrites=true&w=majority")
db = client["Prymus"]
rentsCollection = db["activeRents"]
historyCollection = db["historyRents"]
booksCollection = db["booksList"]