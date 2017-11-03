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

@app.route('/filterloc', methods=["POST"])
def filterLocation():
	dataDict = json.loads(request.data)
	origin= dataDict["origin"]
	destination = dataDict["destination"]
	url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=%s&destinations=%s&key=AIzaSyDjK27JwFmy1ppJYdgzmbKwHlaUgNuSUzM" % (origin, destination)
	r = requests.get(url)
	return r.text

@app.route('/storeloc', methods=["POST"])	
def postLatAndLong():
	# data in string format and you have to parse into dictionary
	dataDict = json.loads(request.data)
	conn = mysql.connect()
	cursor = conn.cursor()
	query = "INSERT INTO Location VALUES (NULL, %s, %s, %s)"
	cursor.execute(query, (dataDict['lat'], dataDict['long'], dataDict['description']))
	conn.commit()
	return jsonify({}), 200

@app.route('/getcord', methods=["POST"])
def getcord():
	dataDict = json.loads(request.data)
	address = dataDict["address"]
	url = "https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=AIzaSyDjK27JwFmy1ppJYdgzmbKwHlaUgNuSUzM" % address
	r= requests.get(url)
	jsonData = json.loads(r.text)
	return jsonify(jsonData["results"][0]["geometry"]["location"])

@app.route('/location', methods=["POST"])	
def location():
	dataDict = json.loads(request.data)
	r=requests.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDjK27JwFmy1ppJYdgzmbKwHlaUgNuSUzM")
	return r.text

		
@app.route("/Authenticate")
def Authenticate():
	cursor = mysql.connect().cursor()
	cursor.execute("SELECT * from User where Username='admin' and Password='Admin'")
	data = cursor.fetchone()
	if data is None:
		return jsonify("Username or Password is wrong")
	else:
		return jsonify("Logged in successfully")

