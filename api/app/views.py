#This file contains all the routes for our application.

from app import app
from flask import request 

from flaskext.mysql import MySQL

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Sabu12345'
app.config['MYSQL_DATABASE_DB'] = 'EmpData'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

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

@app.route("/Authenticate")
def Authenticate():
	username = request.args.get('UserName')
	password = request.args.get('Password')
	cursor = mysql.connect().cursor()
	cursor.execute("SELECT * from User where Username='" + username + "' and Password='" + password + "'")
	data = cursor.fetchone()
	if data is None:
		return "Username or Password is wrong"
	else:
		return "Logged in successfully"	

