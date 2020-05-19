from flask import Blueprint

from classifier.api import ClassifierAPI
from classifier.api import NetworkImageClassifierAPI

classifier_app = Blueprint("classifier_app", __name__)
network_classifier_app = Blueprint("network_classifier_app", __name__)

classifier_view = ClassifierAPI.as_view('classifier_view')
network_classifier_view = NetworkImageClassifierAPI.as_view(
    'network_classifier_view')

# THE ENDPOINT URLS
classifier_app.add_url_rule(
    '/classifier/', view_func=classifier_view, methods=['POST', ])

network_classifier_app.add_url_rule(
    '/networkimg/', view_func=network_classifier_view, methods=['POST', ])
