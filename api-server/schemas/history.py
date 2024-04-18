def individual_serial_rent(rent) -> dict:
    return {
        'id': str(rent['_id']),
        'name': rent['name'],
        'lastName': rent['lastName'],
        'schoolClass': rent['schoolClass'],
        'bookTitle': rent['bookTitle'],
        'deposit': rent['deposit'],
        'rentalDate': rent['rentalDate'],
        'maxDate': rent['maxDate'],
        'returnDate': rent['returnDate']
    }

def serial_history(rents) -> list:
    return [individual_serial_rent(rent) for rent in rents]