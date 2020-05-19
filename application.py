from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    # Allow Cross Origin Resource Sharing (CORS)
    CORS(app)
    # app.config['CORS_HEADERS'] = 'Content-Type'

    # Disable Jsonify Key sorting
    app.config['JSON_SORT_KEYS'] = False

    # import blueprints
    from classifier.views import classifier_app
    from classifier.views import network_classifier_app
    # register blueprints
    app.register_blueprint(classifier_app)
    app.register_blueprint(network_classifier_app)

    return app
