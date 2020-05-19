from application import create_app
from classifier.utilities import model_loader

# import keras.backend.tensorflow_backend as tb
# tb._SYMBOLIC_SCOPE.value = True

# import config.model

app = create_app()

if __name__ == "__main__":
    print("==============================")
    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    print("==============================")
    model_loader("my_model.h5")
    app.run(debug=True)
