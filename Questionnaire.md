## 1. Are there any suboptimal choices in your implementation?
 - Yes, definitely. The entire front-end is terribly simplified, and all the containers are statically made to host the incoming data from the backend. I have no experience with HTML and CSS, but I am sure there must be a better way to create containers and display the data depending on how it comes. At the moment, if a third exchange is added to the payload, it will just be ignored.

- Also, optimally this webpage would run on an external server, instead of locally.

 ## 2. Is any part over-designed?

 - The creation of different exchange objects was probably not necessary, I could have setup the backend with JS and just fetched the data using WebSockets and fed it directly into the front-end. I found it clearer and more scalable to do it like this though, as it is encapsulates all the necessary functions and variables nicely.

 ## 3. If you have to scale your solution to 100 users/second traffic what changes would you make, if any?
 - First, I would try and minimize the amount of data sent to front-end by only sending when there has been an update in price, instead of every `x` seconds, or maybe updating every 5 seconds instead. Load balancing and sharding or replication would be things I would also definitely consider for increased traffic, as this would allow me to reduce the stress on the requests made on the server. It would also provide a more reliable system, as if there is any error at the moment, the entire site would crash.

 ## 4.What are some other enhancements you would have made, if you had more time to do this implementation
 - The first enhacements would clearly be to the front-end.
    - First, I would make it so the data is displayed dynamically based on the incoming data.
    - Second, a lot of formatting and visual enhancements could be made to the website.
        - Firstly the layout could be spread across the whole string, and have  more visually appealing look
        - I could have added further visuals to help see the contrast between exchanges. For instance, graphing the difference in prices for each currency over time. Allowing you to see where the coin is normally cheaper (to buy) or more expensive (to sell)

- There could also be enhancements made to the backend
    - First, I would create an exchange object for each exchange to inherit. This inheritance would make it much easier to add an exchange, only having to deal with the websocket and parsing the data.

    - Second, the way in which data is sent to the front-end could be optimized by keeping track of when the prices are updated, instead of constantly sending data, and updating the webpage. This would also help with more traffic in the website.