#This file contains all the routes for our application.

from app import app

@app.route('/')
def index():
    return 'Hello Worlddd!'

@app.route('/route/<testvariable>')
def testFunction(testvariable):
	return "You passed in the variable %s" % testvariable
