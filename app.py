import os
from os.path import dirname, join

from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
from pymongo import MongoClient

from api.mongo import CryptoCoin

dotenv_path = join(dirname(__file__), "../.env")
load_dotenv(dotenv_path)

app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

mongoClient = MongoClient(os.environ.get("MONGO_URL"))
db = mongoClient.get_database("crypto")
price_history = db.get_collection("price_history")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/coins", methods=["GET"])
def coins():
    coins = CryptoCoin(mongoClient).find_all({})
    return coins


@app.route("/calculate_index/", methods=["GET", "POST"])
def calculate_index():
    if request.method == "POST":
        data = request.json
        print(data)
