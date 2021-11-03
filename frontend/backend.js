// var exchanges_data = [
//     {
//         "name":"Binance",
//         "symbols": ["BTC-USDT", "ETH-USDT"]
//     },
//     {
//         "name":"Coinbase",
//         "symbols": ["BTC-USDT", "ETH-USDT"]
//     }
// ]


// var binanceBTCSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@bookTicker')
// var binanceETHSocket = new WebSocket('wss://stream.binance.com:9443/ws/ethusdt@bookTicker')
// var coinbaseSocket = new WebSocket('wss://ws-feed.exchange.coinbase.com')

// coinbaseSocket.onopen = () => {
//     console.log("Coinbase connected!")

//     var subscribe = {
//         "type":"subscribe",
//         "channels": [ 
//             {
//                 "name":"ticker",
//                 "product_ids": [
//                     "BTC-USD",
//                     "ETH-USD"
//                 ]
//             }
//         ]
//     }

//     coinbaseSocket.send(JSON.stringify(subscribe))
// }

// coinbaseSocket.onmessage = function(event){
    
// }

// binanceBTCSocket.onopen = function(event){
//     console.log("Connected Binance BTC-USD")
// }

// binanceETHSocket.onopen = function(event){
//     console.log("Connected Binacne ETH-USD")
// }

// binanceBTCSocket.onmessage = function(event){
//     console.log("Connected Binance BTC-USD")
// }

// binanceETHSocket.onmessage = function(event){
//     console.log("Connected Binacne ETH-USD")
// }