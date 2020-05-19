# Deploying a Pretrained Keras Model

-   This code demonstrates how to deploy a Keras Model to Production.
-   Its Subdivided into two main parts:

1. Backend - Traffic Signs Classifier as RESTFul Service

    - Python Source Code in Root `./`

2. Frontend - Consuming the RESTFul service from a web app(react app).
    - React Source Code in Client Directory `./client`

The trained model is available as a `.h5` file name `my_model.h5`

The Source Code used to train the Model is available here: https://github.com/ItsCosmas/Traffic-Sign-Classification

## API ENDPOINTS

### - `/classifier/` - accepts file.

-   Example

1. cURL

```
curl --location --request POST 'http://0.0.0.0:5000/classifier/' \
--form 'file=@/path_to_file/image_filename.extension'

```

2. JavaScript

```
var formdata = new FormData();
formdata.append("file", fileInput.files[0], "image_filename.extension");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("http://0.0.0.0:5000/classifier/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### - `/networkimg/` - accepts a `Content-Type: application/json` object containing an image url.

-   Example Request

1. cURL

```
curl --location --request POST 'http://0.0.0.0:5000/networkimg/' \
--data-raw '{
	"image_url": "https://miro.medium.com/max/400/1*nhvFD7uT718W59UlRYaIWQ.jpeg"
}'
```

2. JavaScript

```
var raw = "{\n	\"image_url\": \"https://miro.medium.com/max/400/1*nhvFD7uT718W59UlRYaIWQ.jpeg\"\n}";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("http://0.0.0.0:5000/networkimg/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
