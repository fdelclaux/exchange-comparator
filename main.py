from exchanges import Binance, Coinbase
import threading
import time
import socketio
import requests

def run():
    sio = socketio.Client()
    sio.connect("http://127.0.0.1:5000/")

    lock = threading.Lock()
    orderBooks = {
        "Coinbase": {
            "BTC-USDT":{},
            "ETH-USDT":{}
        },
        "Binance": {
            "BTC-USDT":{},
            "ETH-USDT":{}
        }
    }

    coinbase = Coinbase(orderBook = orderBooks, lock = lock)
    binance = Binance(orderBook = orderBooks, lock = lock)

    coinbase.start()
    binance.start()

    while True:
        try:
            with lock:
                sio.send(orderBooks)
                # print(orderBooks)
                time.sleep(1)
        except Exception as e:
            pass

if __name__=="__main__":
    run()