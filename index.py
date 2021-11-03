from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send
import socketio
import requests
from exchanges import Binance, Coinbase
import threading
import time
import json

app = Flask(__name__)
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

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
                time.sleep(1)
        except Exception as e:
            pass


@app.route('/')
def index():
    pass

@socketio.on("connect")
def test_connect():
    print("User connected")

@socketio.on("message")
def handle_text(message):
    # print("within message: " + json.dumps(message))
    send( message, broadcast = True)

@socketio.on('json')
def handle_message( message ):
    # print(message)
    emit('response', message)


if __name__ == "__main__":

    socketio.run(app)

