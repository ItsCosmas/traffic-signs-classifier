#Grab the python image we want
FROM python:3.7-buster

# set work directory
WORKDIR /app/backend

# Install dependencies
COPY ./requirements.txt /app/backend/
RUN pip3 install --upgrade pip -r requirements.txt


# Add the rest of the code
COPY ./ /app/backend 

# Run the image as a non-root user
RUN adduser myuser
USER myuser

# Run the app.  CMD is required to run on Heroku
# $PORT is set by Heroku			
CMD gunicorn --bind 0.0.0.0:$PORT wsgi:app