#This file contains all the routes for our application.

from app import app

@app.route('/')
def hello_world():
    return 'Hello Worlddd!'