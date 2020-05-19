from application import create_app
from classifier.utilities import model_loader


app = create_app()

# In production Gunicorn
# https: // stackoverflow.com/a/44406384/7744772
print("==============================")
print("* Loading Keras model and Flask starting server...")
print("==============================")
model_loader("my_model.h5")
print("Model Loaded")
print("==============================")

if __name__ == "__main__":
    app.run()
