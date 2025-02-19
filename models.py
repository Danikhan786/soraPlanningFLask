from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class FlightRoute(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    route_name = db.Column(db.String(255), nullable=True)  # Allow NULL values
    source_lat = db.Column(db.Float, nullable=False)
    source_lon = db.Column(db.Float, nullable=False)
    dest_lat = db.Column(db.Float, nullable=False)
    dest_lon = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<FlightRoute {self.id}: ({self.source_lat}, {self.source_lon}) to ({self.dest_lat}, {self.dest_lon})>'
