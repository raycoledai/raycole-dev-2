import os

from bson.son import SON
from pymongo import MongoClient


class MongoTable(object):
    def __init__(self):
        mongo_url = os.environ.get("MONGO_URL")
        client = MongoClient(mongo_url)
        self.db = client["crypto"]


class CryptoHistorical(object):
    def __init__(self, client):
        db = client["crypto"]
        self.col = db["historical"]

    def find_all(self, *args, **kwargs):
        return self.col.find(args)

    def find(self, selector):
        return self.col.find_one(selector)

    def find_coin(self, coin_id):
        return self.col.find({"coin_id": coin_id})

    # def create(self, kudo):
    #   return self.col.insert_one(kudo)

    # def update(self, selector, kudo):
    #   return self.col.replace_one(selector, kudo).modified_count

    # def delete(self, selector):
    #   return self.col.delete_one(selector).deleted_count

    def calculate_index(self, coin_ids):
        pipeline = [
            {u"$match": {u"coin_id": {u"$in": coin_ids}}},
            {
                u"$group": {
                    u"_id": u"$datetime",
                    u"total_market_cap": {u"$sum": u"$market_cap"},
                    u"agg_price": {
                        u"$push": {
                            u"symbol": u"$symbol",
                            u"sym_price": u"$close",
                            u"sym_market_cap": u"$market_cap",
                        }
                    },
                }
            },
            {
                u"$addFields": {
                    u"value": {
                        u"$sum": {
                            u"$map": {
                                u"input": u"$agg_price",
                                u"as": u"agg",
                                u"in": {
                                    u"$multiply": [
                                        u"$$agg.sym_price",
                                        {
                                            u"$divide": [
                                                u"$$agg.sym_market_cap",
                                                u"$total_market_cap",
                                            ]
                                        },
                                    ]
                                },
                            }
                        }
                    }
                }
            },
            {u"$sort": SON([(u"_id", -1)])},
        ]
        cursor = self.col.aggregate(pipeline, allowDiskUse=False)
        return list(cursor)


class CryptoCoin(object):
    def __init__(self, client):
        db = client["crypto"]
        self.col = db["coin"]

    def find_all(self, *args, **kwargs):
        return self.col.find(*args)

    def find(self, selector):
        return self.col.find_one(selector)

    def find_coin(self, coin_id):
        return self.col.find({"coin_id": coin_id})

    # def create(self, kudo):
    #   return self.col.insert_one(kudo)

    # def update(self, selector, kudo):
    #   return self.col.replace_one(selector, kudo).modified_count

    # def delete(self, selector):
    #   return self.col.delete_one(selector).deleted_count
