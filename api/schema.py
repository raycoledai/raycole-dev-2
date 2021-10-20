from marshmallow import Schema, fields


class PricePoint(Schema):
    id = fields.Int(required=True)
    coin_id = fields.Int(required=True)
    name = fields.Str(required=True)
    symbol = fields.Str(required=True)
    datetime = fields.DateTime(required=True)
    timestamp = fields.Int(required=True)
    open = fields.Float(required=True)
    high = fields.Float(required=True)
    low = fields.Float(required=True)
    close = fields.Float(required=True)
    market_cap = fields.Float(required=True)
    volume = fields.Float(required=True)
