def individual_serial_rent(rent) -> dict:
    return {
        'id': str(rent['_id']),
        'name': rent['name'],
        'lastName': rent['lastName'],
        'schoolClass': rent['schoolClass'],
        'bookTitle': rent['bookTitle'],
        'deposit': rent['deposit'],
        'rentDate': rent['rentDate'],
        'dueDate': rent['dueDate']
    }

def serial_rents(rents) -> list:
    return [individual_serial_rent(rent) for rent in rents]