def get_flight_routes():
    # For now, return a hardcoded list or fetch from a database
    return [
        {'id': 1, 'origin': 'New York', 'destination': 'London'},
        {'id': 2, 'origin': 'Los Angeles', 'destination': 'Tokyo'},
    ]

def add_flight_route(origin, destination):
    # You can save the data to a database or a list
    print(f"Added flight route from {origin} to {destination}")
    # Save to the database or data store
