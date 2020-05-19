from flask.views import MethodView
from flask import jsonify, request, abort, send_file
import uuid
import os
from werkzeug.utils import secure_filename
import cv2
import numpy as np
from PIL import Image
import requests

from classifier.classes import classes
from classifier.utilities import preprocessing, is_url_image
import config

model = config.model


class ClassifierAPI(MethodView):

    def __init__(self):
        if (request.method != 'POST') and not request.files:
            abort(400)

    ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

    def allowed_image(self, filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS

    def post(self):
        file = request.files['file']
        if file.filename == '':
            error = 'No file selected for uploading'
            return jsonify({"error": error}), 400

        if file and self.allowed_image(file.filename):
            filename = secure_filename(file.filename)

            # generate unique filename
            filename = str(uuid.uuid4()) + '.' + \
                filename.rsplit('.', 1)[1].lower()
            # Save File On Server
            file.save(os.path.join(os.getcwd(), 'static',
                                   'upload', 'image', '', filename))

            # Classifier Logic Here

            # Read Image from working Directory
            img = cv2.imread(os.path.join(os.getcwd(), 'static',
                                          'upload', 'image', '', filename), 1)

            # Preprocess image and print its shape
            img = np.asarray(img)
            img = cv2.resize(img, (32, 32))
            img = preprocessing(img)

            # Reshape reshape
            img = img.reshape(1, 32, 32, 1)

            model = config.model
            predicted_class = (int(model.predict_classes(img)))

            # Get The Predicted Class , type convert it to int
            predicted_class = (int(model.predict_classes(img)))
            if predicted_class in classes:
                sign = classes[predicted_class]

            response = 'Classification Request Successful'
            # Remove the Predicted Image from Server
            print(response)
            os.unlink(os.path.join(os.getcwd(), 'static',
                                   'upload', 'image', '', filename))
            print("=========================")
            print("Image Deleted From Server")
            print("=========================")

            return jsonify({"message": response, "body": {"predicted_sign": sign}}), 200

        else:
            error = 'Allowed file types are png, jpg, jpeg'
            return jsonify({"error": error}), 400


class NetworkImageClassifierAPI(MethodView):
    def __init__(self):
        if (request.method != 'POST'):
            abort(400)

    def post(self):
        image_url = request.json.get('image_url')
        if is_url_image(image_url):
            r = requests.get(image_url, stream=True)
            img = Image.open(r.raw)
            # Preprocess image and print its shape
            img = np.asarray(img)
            img = cv2.resize(img, (32, 32))
            img = preprocessing(img)

            # Reshape reshape
            img = img.reshape(1, 32, 32, 1)

            model = config.model
            predicted_class = (int(model.predict_classes(img)))

            # Get The Predicted Class , type convert it to int
            predicted_class = (int(model.predict_classes(img)))
            if predicted_class in classes:
                sign = classes[predicted_class]

            response = 'Classification Request Successful'
            # Remove the Predicted Image from Server
            print(response)
            return jsonify({"message": response, "body": {"predicted_sign": sign}}), 200
        else:
            error = 'The URL needs to point to an image'
            return jsonify({"error": error}), 400
