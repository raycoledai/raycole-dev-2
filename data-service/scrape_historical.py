from datetime import datetime

import requests
from tqdm import tqdm

import pymongo

mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
db = mongo_client["crypto"]
coins = db["coin"]
crypto_col = db["historical"]

time_start = 1620691200  # 11/05/21
time_end = 1622505599  # 31/05/21

api = "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/historical"

pbar = tqdm(coins.find(), leave=False, position=0)

for coin in pbar:
    pbar.set_description(
        f"Getting historical price data for: {coin['name']}({coin['symbol']})..."
    )

    url = f"{api}?id={coin['coin_id']}&convertId=2781&timeStart={time_start}&timeEnd={time_end}"
    response = requests.get(url)

    if response.ok:
        documents = []

        data = response.json()["data"]
        name = data.get("name")
        symbol = data.get("symbol")

        for q in tqdm(data.get("quotes"), leave=False, position=2):
            quote = q["quote"]
            document = {
                "_id": f"{q.get('timeOpen')[:10]}-{coin['coin_id']}",
                "coin_id": coin["coin_id"],
                "name": name,
                "symbol": symbol,
                "datetime": q.get("timeOpen"),
                "timestamp": int(
                    datetime.timestamp(
                        datetime.strptime(q.get("timeOpen"), "%Y-%m-%dT%H:%M:%S.%fZ")
                    )
                ),
                "open": quote.get("open"),
                "high": quote.get("high"),
                "low": quote.get("low"),
                "close": quote.get("close"),
                "volume": quote.get("volume"),
                "market_cap": quote.get("marketCap"),
            }
            documents.append(document)
        crypto_col.insert_many(documents)
    else:
        print(
            f"Failed for {coin['coin_id']} - {coin['name']}. An error occured: {response.status_code}"
        )
