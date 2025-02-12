from flask import Blueprint, render_template, request, redirect, url_for
from utils import get_flight_routes, add_flight_route

main_routes = Blueprint('main_routes', __name__)


# Home page route
@main_routes.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        origin = request.form['origin']
        destination = request.form['destination']
        # Add new flight route logic (this function should update the data store or database)
        add_flight_route(origin, destination)
        return redirect(url_for('main_routes.home'))

    routes = get_flight_routes()  # Fetch all routes from your data store
    return render_template('index.html', routes=routes)
