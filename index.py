from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send
import requests
from exchanges import Binance, Coinbase
import threading
import time
import json

app = Flask(__name__)
socketio = SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

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

coinbase = Coinbase(orderBook = orderBooks, lock = lock )
binance = Binance(orderBook = orderBooks, lock = lock )

coinbase.start()
binance.start()

def update():
    while True:
        try:
            with lock:
                socketio.send(orderBooks)
                # print(orderBooks)
                time.sleep(1)
        except Exception as e:
            pass

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on("connect")
def connect():
    print("User connected")
    global thread
    with lock:
        thread = socketio.start_background_task(update)


@socketio.on("message")
def handle_message(message):
    # print("within message: " + json.dumps(message))
    send( message, broadcast = True)

@socketio.on('json')
def handle_text( message ):
    # print(message)
    emit('response', message)

@socketio.on('disconnect')
def test_disconnect():
    print("User disconnected")


if __name__ == "__main__":

    socketio.run(app)

