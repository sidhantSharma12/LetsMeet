#This file contains all the routes for our application.

from app import app
from flask import request 

@app.route('/')
def index():
    return 'Hello Worlddd!'

@app.route('/route/<testvariable>')
def testFunction(testvariable):
	return "You passed in the variable %s" % testvariable

@app.route('/post/<int:id>')
def testIntFunction(id):
	return "You passed in the integer %d" % id

@app.route('/getme', methods=["POST"])
def getHttpTest():
	return "GET test"