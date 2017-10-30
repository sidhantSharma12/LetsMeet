#This file contains all the routes for our application.
from app import app
from flask import request, jsonify
import json

from flaskext.mysql import MySQL

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Sabu12345'
app.config['MYSQL_DATABASE_DB'] = 'EmpData'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

@app.route('/')
def index():
	dict = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}
	return jsonify(dict)

@app.route('/route/<testvariable>')
def testFunction(testvariable):
	return "You passed in the variable %s" % testvariable

@app.route('/post/<int:id>')
def testIntFunction(id):
	return "You passed in the integer %d" % id

@app.route('/getme', methods=["POST"])
def getHttpTest():
	return "GET test"

@app.route('/storeloc',  methods=["POST"])	
def postLatAndLong():
	# data in string format and you have to parse into dictionary
	data = request.data
	dataDict = json.loads(data)
	conn = mysql.connect()
	cursor = conn.cursor()
	query = "INSERT INTO Location VALUES (NULL, %s, %s)"
	cursor.execute(query, (dataDict['lat'], dataDict['long']))
	conn.commit()
	cursor.execute("SELECT * FROM Location")
	ans = cursor.fetchall()
	print(ans)
	dict = {'Name': 'Zara', 'Age': 7, 'Class': 'First'}
	return jsonify(dict) 


@app.route("/Authenticate")
def Authenticate():
	cursor = mysql.connect().cursor()
	cursor.execute("SELECT * from User where Username='admin' and Password='Admin'")
	data = cursor.fetchone()
	if data is None:
		return jsonify("Username or Password is wrong")
	else:
		return jsonify("Logged in successfully")

