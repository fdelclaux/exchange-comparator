const rootElement = document.getElementById("root")

const renderHeader = () => {
    const header = document.createElement("div")
    header.classList.add("header")

    const headerText = document.createElement("h1")
    headerText.classList.add("header-text")

    headerText.textContent = "Exchange Comparator"

    header.appendChild(headerText)
    rootElement.appendChild(header)
}

renderHeader()
var exchangesContainer = document.createElement("div")
exchangesContainer.classList.add("exchange-container")

var coinbaseContainer = document.createElement("div")
coinbaseContainer.classList.add("exchange")

var binanceContainer = document.createElement("div")
binanceContainer.classList.add("exchange")

var coinbaseHeader = document.createElement("h2")
coinbaseHeader.textContent = "Coinbase"

var binanceHeader = document.createElement("h2")
binanceHeader.textContent = "Binance"

var cbBTCContainer = document.createElement("div")
cbBTCContainer.classList.add('currency-container');

var cbBTCHeader = document.createElement("h3")
cbBTCHeader.textContent = "Bitcoin"

var coinbaseBTCask = document.createElement("p")
coinbaseBTCask.classList.add("coin");

var coinbaseBTCbid = document.createElement("p")
coinbaseBTCbid.classList.add("coin");

cbBTCContainer.appendChild(cbBTCHeader);
cbBTCContainer.appendChild(coinbaseBTCask);
cbBTCContainer.appendChild(coinbaseBTCbid);

var cbETHContainer = document.createElement("div")
cbETHContainer.classList.add("currency-container")

var cbETHHeader = document.createElement("h3")
cbETHHeader.textContent = "Ethereum"

var coinbaseETHask = document.createElement("p")
coinbaseETHask.classList.add("coin")

var coinbaseETHbid = document.createElement("p")
coinbaseETHbid.classList.add("coin")

cbETHContainer.appendChild(cbETHHeader);
cbETHContainer.appendChild(coinbaseETHask);
cbETHContainer.appendChild(coinbaseETHbid);

var biBTCContainer = document.createElement("div")
biBTCContainer.classList.add('currency-container')

var biBTCHeader = document.createElement("h3")
biBTCHeader.textContent = "Bitcoin"

var binanceBTCask = document.createElement("p")
binanceBTCask.classList.add("coin")

var binanceBTCbid = document.createElement("p")
binanceBTCbid.classList.add("coin")

biBTCContainer.appendChild(biBTCHeader);
biBTCContainer.appendChild(binanceBTCask);
biBTCContainer.appendChild(binanceBTCbid);

var biETHContainer = document.createElement("div")
biETHContainer.classList.add('currency-container')

var biETHHeader = document.createElement("h3")
biETHHeader.textContent = "Ethereum"

var binanceETHask = document.createElement("p")
binanceETHask.classList.add("coin")

var binanceETHbid = document.createElement("p")
binanceETHbid.classList.add("coin")

biETHContainer.appendChild(biETHHeader);
biETHContainer.appendChild(binanceETHask);
biETHContainer.appendChild(binanceETHbid);

coinbaseContainer.appendChild(coinbaseHeader);
coinbaseContainer.appendChild(cbBTCContainer);
coinbaseContainer.appendChild(cbETHContainer);

binanceContainer.appendChild(binanceHeader);
binanceContainer.appendChild(biBTCContainer);
binanceContainer.appendChild(biETHContainer);

exchangesContainer.appendChild(coinbaseContainer);
exchangesContainer.appendChild(binanceContainer);

rootElement.appendChild(exchangesContainer);


const recommendationContainer = document.createElement("div")
recommendationContainer.classList.add("rec-container")

const recommendationHeader = document.createElement("h3")
recommendationHeader.textContent = "Our Recommendation!"


const BTCrecommendation = document.createElement("p")

const ETHrecommendation = document.createElement("p")

recommendationContainer.appendChild(recommendationHeader);

recommendationContainer.appendChild(BTCrecommendation);
recommendationContainer.appendChild(ETHrecommendation);

rootElement.appendChild(recommendationContainer);



var socket = io.connect("http://127.0.0.1:5000/");    

socket.on("connect", () => {
    console.log('User connected')
});

socket.on("message", function(event) {
    // JSON.parse()
    console.log(event)

    coinbaseBTCask.innerHTML = "Ask $ " + Number(event["Coinbase"]["BTC-USDT"]["ask"]).toFixed(2)
    coinbaseBTCbid.innerHTML = "Bid: $ " + Number(event["Coinbase"]["BTC-USDT"]["bid"]).toFixed(2)
    coinbaseETHask.innerHTML = "Ask: $ " + Number(event["Coinbase"]["ETH-USDT"]["ask"]).toFixed(2)
    coinbaseETHbid.innerHTML = "Bid: $ " + Number(event["Coinbase"]["ETH-USDT"]["bid"]).toFixed(2)
    binanceBTCask.innerHTML = "Ask: $ " + Number(event["Binance"]["BTC-USDT"]["ask"]).toFixed(2) 
    binanceBTCbid.innerHTML = "Bid: $ " + Number(event["Binance"]["BTC-USDT"]["bid"]).toFixed(2)
    binanceETHask.innerHTML = "Ask: $ " + Number(event["Binance"]["ETH-USDT"]["ask"]).toFixed(2)
    binanceETHbid.innerHTML = "Bid: $ " + Number(event["Binance"]["ETH-USDT"]["bid"]).toFixed(2)


    if( Number(event["Coinbase"]["BTC-USDT"]["bid"]) < Number(event["Binance"]["BTC-USDT"]["bid"]) ){
        var bestToBuyBTC = "Coinbase"
    }
    else{
        var bestToBuyBTC = "Binance"
     }

    if(Number(event["Coinbase"]["BTC-USDT"]["ask"]) > Number(event["Binance"]["BTC-USDT"]["ask"])){
        var bestToSellBTC = "Coinbase"
    }
    else{
        var bestToSellBTC = "Binance"
    }

    if(Number(event["Coinbase"]["ETH-USDT"]["bid"]) < Number(event["Binance"]["ETH-USDT"]["bid"])){
        var bestToBuyETH = "Coinbase"
    }
    else{
        var bestToBuyETH = "Binance"
    }

    if(Number(event["Coinbase"]["ETH-USDT"]["ask"]) > Number(event["Binance"]["ETH-USDT"]["ask"]))
    {
        var bestToSellETH = "Coinbase"
    }
    else{
        var bestToSellETH = "Binance"
    }

    BTCrecommendation.innerHTML = 'You should buy Bitcoin on ' + bestToBuyBTC + ' and sell it on ' + bestToSellBTC

    ETHrecommendation.innerHTML = 'You should buy Ethereum on '+ bestToBuyETH + ' and sell it on ' + bestToSellETH

});

