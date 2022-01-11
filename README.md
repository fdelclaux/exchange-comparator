# **READ ME**

Welcome to the Exchange Comparator

What you need to start:
- Download Code
- Install dependencies
- Run

### *Instal Dependencies*

There are a couple of dependencies we need to make sure we have installed.

First of all, make sure you have a functioning version of `python3`

Then, you can use the created virutal environment to make sure you have all dependencies installed by simply typing `./Scripts/activate` on your command line.

From here, you should be able to skip directly to the *Run* section. Howeveer, I will leave steps to install dependencies below just in case.

To check if you have the required libraries run `pip freeze` and `npm list`. You must have a `5.x` version of `flask-socketio` and a `>3.x` version of socketio, as well as all of the other libraries listed below.

If you don't then, for our Backend you must have the following libraries:
- `flask`
    - `pip install flask`
- `flask-socketio`
    - `pip install flask-scoketio --upgarde`
- `websocket-client`
    - `pip install websocket-client`
- `python-socketio`
    - `pip install python-socketio`
- `requests`
    - `pip install requests`

Also, for out Front-end:
- `socketio`
    - `npm install socketio`


### *Run*

To run our app, we will first start out backend server, then our frontend and then our script to feed exchange data to our backend server.

- Running the backend server
    - Set `FLASK_APP` enviornment variable
        - For Powershell users
            - `$env:FLASK_APP="index"`
        - For mac users
            - `export FLASK_APP="index"`
    - Run Flask App, this by default will set up the server on port `5000`
        - `py -m flask run`

Now, if you open up `http://localhost:5000/` on your browser, you will be able to see the webpage.

        
