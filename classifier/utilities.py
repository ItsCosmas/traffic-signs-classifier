from keras.models import load_model
from tensorflow.keras.models import load_model
import h5py
import cv2
import requests

import config


# Function to load the model, called before app is run
def model_loader(model_path):
    config.model = load_model(model_path)



# Function to convert Image to grayscale
def grayscale(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return img


# The Histogram Equalizer from Open CV
def equalize(img):
    img = cv2.equalizeHist(img)
    return img


# The Image Preprocessing Function
def preprocessing(img):
    img = grayscale(img)
    img = equalize(img)
    # normalize the images, i.e. convert the pixel values to fit btwn 0 and 1
    img = img/255
    return img


# Check whether the url passed is an image
def is_url_image(image_url):
    image_formats = ("image/png", "image/jpeg", "image/jpg")
    r = requests.head(image_url)
    if r.headers["content-type"] in image_formats:
        return True
    return False
