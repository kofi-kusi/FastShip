from enum import Enum


class APITag(str, Enum):
    SHIPMENT = "Shipment"
    SELLER = "Seller"
    DELIVERY_PARTNER = "Delivery Partner"
