import os
from os.path import dirname, join

from datetime import date
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import json
from pymongo import MongoClient

from api.mongo import CryptoCoin, CryptoHistorical

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
    coins = list(
        CryptoCoin(mongoClient).find_all(
            {},
            {
                "_id": 0,
                "coin_id": 1,
                "name": 1,
                "symbol": 1,
                "cmcRank": 1,
                "price": 1,
                "marketCap": 1,
            },
        )
    )
    for coin in coins:
        coin["key"] = coin["coin_id"]
    return jsonify(coins)


@app.route("/calculate_index", methods=["GET", "POST"])
def calculate_index():
    if request.method == "POST":
        data = json.loads(request.data)
        index = CryptoHistorical(mongoClient).calculate_index(data["coin_ids"])
        for point in index:
            point["date"] = point["_id"][:10]
        return jsonify(index)
