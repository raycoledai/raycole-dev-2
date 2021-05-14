from datetime import date, datetime, timedelta
import pymongo
import requests

mongo_client = pymongo.MongoClient("mongodb://localhost:27017/")
db = mongo_client["crypto"]
crypto_col = db["price_history"]

start_date = date(2021, 5, 7)
curr_date = start_date

api = "https://web-api.coinmarketcap.com/v1/cryptocurrency/listings/historical"

while curr_date > date(2020, 12, 31):
    curr_dt = datetime(year=curr_date.year, month=curr_date.month, day=curr_date.day)
    tstamp = int(datetime.timestamp(curr_dt))

    for start in range(1, 1001, 200):
        url = f"{api}?convert=USD&date={curr_date}&limit=200&start={start}"
        response = requests.get(url)

        if response.ok:
            data = response.json()["data"]
            for coin in data:
                usd_quote = coin.get("quote").get("USD")
                document = {
                    "_id": f"{curr_date}-{coin.get('id')}",
                    "coin_id": coin.get("id"),
                    "datetime": curr_dt,
                    "timestamp": tstamp,
                    "name": coin.get("name"),
                    "symbol": coin.get("symbol"),
                    "slug": coin.get("slug"),
                    "price": usd_quote.get("price"),
                    "market_cap": usd_quote.get("market_cap"),
                    "volume": usd_quote.get("volume_24h"),
                    "percent_change": usd_quote.get("percent_change_24h"),
                    "tags": coin.get("tags"),
                }
                crypto_col.insert_one(document)

    curr_date -= timedelta(days=1)
