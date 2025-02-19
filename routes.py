from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from models import db, FlightRoute
import folium

main_routes = Blueprint('main_routes', __name__)

@main_routes.route("/", methods=["GET", "POST"])
def index():
    routes = FlightRoute.query.all()  # Fetch all saved routes
    map_file = None  # Default: No map

    # Extract routes with source and destination coordinates
    route_data = [
        {
            "route_name": route.route_name,
            "source_lat": route.source_lat,
            "source_lon": route.source_lon,
            "dest_lat": route.dest_lat,
            "dest_lon": route.dest_lon
        }
        for route in routes
    ]

    if request.method == "POST":
        source_lat = request.form.get("sourceLat")
        source_lon = request.form.get("sourceLon")
        dest_lat = request.form.get("destLat")
        dest_lon = request.form.get("destLon")

        if source_lat and source_lon and dest_lat and dest_lon:
            source = [float(source_lat), float(source_lon)]
            destination = [float(dest_lat), float(dest_lon)]
            
            # Create a Folium map centered at the source location
            m = folium.Map(location=source, zoom_start=6)

            # Add markers for source and destination
            folium.Marker(source, popup="Source", icon=folium.Icon(color="blue")).add_to(m)
            folium.Marker(destination, popup="Destination", icon=folium.Icon(color="red")).add_to(m)

            # Draw a line between the source and destination
            folium.PolyLine([source, destination], color="blue", weight=3, opacity=0.7).add_to(m)

            # Save the map as an HTML file
            map_file = "static/map.html"
            m.save(map_file)

    return render_template("index.html", map_file=map_file, routes=routes, route_data=route_data)


@main_routes.route('/add_route', methods=['POST'])
def add_route():
    route_name = request.form.get('routeName')
    source_lat = request.form.get('sourceLat')
    source_lon = request.form.get('sourceLon')
    dest_lat = request.form.get('destLat')
    dest_lon = request.form.get('destLon')

    if not (route_name and source_lat and source_lon and dest_lat and dest_lon):
        return jsonify({"error": "All fields are required"}), 400

    new_route = FlightRoute(
        route_name=route_name.strip(),  # Ensure it's not empty
        source_lat=float(source_lat),
        source_lon=float(source_lon),
        dest_lat=float(dest_lat),
        dest_lon=float(dest_lon),
    )
    db.session.add(new_route)
    db.session.commit()

    return redirect(url_for('main_routes.index'))  # Fixed: Redirect to 'index' instead of 'home'


@main_routes.route('/delete_route', methods=['POST'])
def delete_route():
    route_id = request.form.get('route_id')
    if not route_id:
        return jsonify({"error": "No route selected"}), 400

    route = FlightRoute.query.get(route_id)
    if not route:
        return jsonify({"error": "Route not found"}), 404

    db.session.delete(route)
    db.session.commit()

    return redirect(url_for('main_routes.index'))  # Fixed: Redirect to 'index'
