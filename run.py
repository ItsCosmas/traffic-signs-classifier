from application import create_app
from classifier.utilities import model_loader

# import config.model

app = create_app()

if __name__ == "__main__":
    print("==============================")
    print(("* Loading Keras model and Flask starting server..."
           "please wait until server has fully started"))
    print("==============================")
    model_loader("my_model.h5")
    print("Model Loaded")
    print("==============================")
    # app.run(debug=True)
    app.run(host='0.0.0.0')  # run in prod
