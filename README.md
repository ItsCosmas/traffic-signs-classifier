# Deploying Traffic Signs Classifier as RESTFul Service

Code for deploy a pretrained model for traffic sign classification

The model is available as a `.h5` file name `my_model.h5`

Code for Training the Model is available Here: https://github.com/ItsCosmas/Traffic-Sign-Classification

API ENDPOINTS

-   `/classifier/` - accepts `Content-Type: multipart/form-data` in the following form:

```

```

-   `/networkimg/` - accepts a `Content-Type: application/json` object containing an image url as follows:

```
{
    "image_url":"https://github.com/ItsCosmas/Traffic-Sign-Classification"
}
```
