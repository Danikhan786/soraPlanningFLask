from flask import Flask
from routes import main_routes

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Register blueprints (routes)
app.register_blueprint(main_routes)

if __name__ == "__main__":
    app.run(debug=True)
