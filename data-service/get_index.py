# Simple top 20 geometric average index:
"""
db = db.getSiblingDB("crypto");
db.getCollection("price_history").aggregate(
    [
        { 
            "$match" : { 
                "symbol" : { 
                    "$in" : [
                        "BTC", 
                        "ETH", 
                        "XRP", 
                        "ADA", 
                        "BNB", 
                        "DOGE", 
                        "DOT", 
                        "BCH", 
                        "LTC", 
                        "VET", 
                        "XLM", 
                        "ETC", 
                        "SOL", 
                        "THETA", 
                        "FIL", 
                        "TRX", 
                        "EOS", 
                        "UNI", 
                        "LINK", 
                        "FIL"
                    ]
                }
            } 
        }, 
        { 
            "$group" : { 
                "_id" : "$datetime", 
                "total" : { 
                    "$sum" : { 
                        "$pow" : [
                            "$price", 
                            0.05
                        ]
                    }
                }
            }
        }, 
        { 
            "$sort" : { 
                "_id" : 1.0
            }
        }
    ], 
    { 
        "allowDiskUse" : false
    }
);
"""
