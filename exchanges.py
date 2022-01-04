
import websocket, json
from typing import Optional
import threading
import time


class Coinbase(threading.Thread):

    def __init__(
        self, 
        url: Optional[str] = 'wss://ws-feed.exchange.coinbase.com',
        exchange: Optional[str] = 'Coinbase',
        orderBook: Optional[dict] = dict(),
        lock = None
    ):
        super().__init__()
        self.url = url
        self.exchange = exchange
        self.orderBook = orderBook[exchange]
        self.lock = lock
        self.ws = websocket.WebSocketApp(self.url, on_open = self.on_open, on_message=self.on_message)

    def run(self):
        while True:
            self.ws.run_forever()
    
    def on_open(self,ws):
        """
            Definition: sets subscribe data
        """

        # print("Connection establish with Coinbase")

        subscribe = {
            "type":"subscribe",
            "channels": [ 
                {
                    "name":"ticker",
                    "product_ids": [
                        "BTC-USD",
                        "ETH-USD"
                    ]
                }
            ]
        }

        self.ws.send(json.dumps(subscribe))

    def on_message(self,ws,message):
        json_message = json.loads(message)
        # print(json_message)
        with self.lock:

            if json_message['product_id'] == 'BTC-USD':

                self.orderBook['BTC-USDT']['bid'] = json_message["best_bid"]
                self.orderBook['BTC-USDT']['ask'] = json_message["best_ask"]
            else:
                self.orderBook['ETH-USDT']['bid'] = json_message["best_bid"]
                self.orderBook['ETH-USDT']['ask'] = json_message["best_ask"]

            
            

        
class Binance(threading.Thread):

    def __init__(
        self, 
        url: Optional[str] = 'wss://stream.binance.com:9443/ws',
        exchange: Optional[str] = 'Binance',
        orderBook: Optional[dict] = dict(),
        lock = None
    ):
        super().__init__()
        self.url = url
        self.exchange = exchange
        self.orderBook = orderBook[exchange]
        self.lock = lock
        self.ws =  websocket.WebSocketApp(self.url, on_open = self.on_open, on_message=self.on_message)

    def run(self):

        while True:
            self.ws.run_forever()

    def on_open(self,ws):

        # print("Connection established with Binance")

        subscribe = {
                "method":"SUBSCRIBE",
                "params": [
                        "btcusdt@bookTicker",
                        "ethusdt@bookTicker"
                    ],
                "id": 1
            }

        self.ws.send(json.dumps(subscribe))


    def on_message(self, ws, message):
        json_message = json.loads(message)

        with self.lock:

            if json_message['s'] == "BTCUSDT":

                self.orderBook["BTC-USDT"]['bid'] = json_message["b"]
                self.orderBook["BTC-USDT"]['ask'] = json_message["a"]

            elif json_message['s'] == "ETHUSDT":
                self.orderBook["ETH-USDT"]['bid'] = json_message["b"]
                self.orderBook["ETH-USDT"]['ask'] = json_message["a"]








