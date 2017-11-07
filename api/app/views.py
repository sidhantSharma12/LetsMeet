#This file contains all the routes for our application.
from app import app
from flask import request, jsonify
import json
import requests

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

@app.route('/post/<int:id>')
def testIntFunction(id):
	return "You passed in the integer %d" % id

@app.route('/storeloc', methods=["POST"])	
def postLatAndLong():
	# data in string format and you have to parse into dictionary
	dataDict = json.loads(request.data)
	conn = mysql.connect()
	cursor = conn.cursor()
	query = "INSERT INTO Location VALUES (NULL, %s, %s, %s, %s)"
	cursor.execute(query, (dataDict['lat'], dataDict['long'], dataDict['name'], dataDict['description']))
	conn.commit()
	return jsonify({}), 200

@app.route('/getallloc')	
def getAllLocation():
	conn = mysql.connect()
	cursor = conn.cursor()
	cursor.execute("SELECT latitude, longitude, name, description from Location")
	data = cursor.fetchall()
	return jsonify(data)

@app.route('/getcord', methods=["POST"])
def getcord():
	dataDict = json.loads(request.data)
	address = dataDict["address"]
	url = "https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=AIzaSyDjK27JwFmy1ppJYdgzmbKwHlaUgNuSUzM" % address
	r= requests.get(url)
	jsonData = json.loads(r.text)
	return jsonify(jsonData["results"][0]["geometry"]["location"])

		
@app.route("/Authenticate")
def Authenticate():
	cursor = mysql.connect().cursor()
	cursor.execute("SELECT * from User where Username='admin' and Password='Admin'")
	data = cursor.fetchone()
	if data is None:
		return jsonify("Username or Password is wrong")
	else:
		return jsonify("Logged in successfully")

