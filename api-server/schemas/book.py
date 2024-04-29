def individual_serial_book(book) -> dict:
    return {
        'id': str(book['_id']),
        'code': book['code'],
        'title': book['title'],
        'onStock': int(book['onStock']),
        'rented': int(book['rented']),
    }

def serial_books(books) -> list:
    return [individual_serial_book(book) for book in books]