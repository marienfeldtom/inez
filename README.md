# INEZ Competition
  <img src="https://www.it-talents.de/thumbs/partner/edeka-digital-gmbh/original-500x173.jpg" width="150" title="INEZ"> <img src="https://www.it-talents.de/assets/img/logo_blue.svg" width="150" title="INEZ">
  

  
INEZ is a German Code Competition hosted by IT-Talents.de and EDEKA Digital. This repo contains the admin panel + client app for my submission in this contest.

* * *

In the admin panel EDEKA employees could add ingredients that can be use by the end user in their intelligent grocery list. 
The application also offers the Socket.io interface which is used by the app to gain ingredient information.

- [INEZ Competition](#inez-competition)
  * [Sequence Diagram](#sequence-diagram)
  * [Used dependencies](#used-dependencies)
    + [Backend](#backend)
    + [Frontend](#frontend)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Run application](#run-application)
    + [Server](#server)
    + [Client](#client)
    + [Tests](#tests)
  * [Deployment](#deployment)

## Sequence Diagram
<img src="https://github.com/marienfeldtom/inez_admin/blob/master/diagram.svg">

## Used dependencies

### Backend
* Node.JS (javascript runtime)
* NPM (dependency management)
* ExpressJS (providing http admin panel)
* MustacheJS (templating/rendering data)
* PouchDB (without CouchDB connection - just file storage)
* CORS (only enabled for development purposes)
* fuse.js (fuzzy keyword search)
* socket.io (real time autocomplete and suggestions)

### Frontend
* Vue 3
* Bootstrap
* PouchDB
* socket.io-client

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

 ## Installation
 
 * `git clone <repository-url>` this repository 
 
 **Configuration:**
 Configs can be found in `backend/config.json` and `frontend/.env + frontend/.env.production`, but there is no need to change something.
 
backend/config.json:

| config key     | default value     |
|----------------|-------------------|
| webserver.ip   | 0.0.0.0           |
| webserver.port | 3000              |
| socket.ip      | 0.0.0.0           |
| socket.port    | 3001              |
| file           | lebensmittel.json |

.env.production (enter websocket ip and port from backend/config.json)

| config key     | default value     |
|----------------|-------------------|
| VUE_APP_ADRESS | http://165.22.24.12  |
| VUE_APP_PORT   | 3001              |

.env (enter websocket ip and port from backend/config.json)

| config key     | default value     |
|----------------|-------------------|
| VUE_APP_ADRESS | http://localhost  |
| VUE_APP_PORT   | 3001              |

 Install Server dependencies
```javascript
cd backend
npm install
```

 Install Client dependencies
```javascript
cd frontend
npm install
```

## Run application
In order to run the application you need to start the server and the vue dev environment.

### Server
 ```javascript
 cd backend
node server.js
```

### Client

```javascript
cd frontend
npm run serve
```

### Tests
Tests can be found in /backend/test/socket.js.
The test imports the server and starts it. Then it simulates a client, and sends a query containing the word "banane". If the correct result is returned, the test succeeds.

```javascript
npm run test
```

You can visit the app in browser under http://localhost:8080

## Deployment

After each push to the master branch, github starts a webhook, which fires a POST request to the build / production server.
The server then pulls the branch, installs the dependencies and builds both frontend and backend it. Afterwards mocha tests are executed and if they are successful, the application launches.

deploy.sh
```shell 
cd inez
pm2 stop ./backend/server.js
pm2 stop static-page-server-80
echo "Pulling from Master"
git pull https://{{inserapikeyhere}}:x-oauth-basic@github.com/marienfeldtom/inez.git  master
echo "Pulled successfully from master"
echo "Installing Backend"
npm install --prefix ./backend
echo "Installing Frontend"
npm install --prefix ./frontend
echo "Starting Backend Server"
pm2 start ./backend/server.js
echo "Building Frontend"
cd frontend
npm run build
echo "Serving Frontend"
pm2 serve dist 80
echo "Server restarted Successfully"
```

endpoint.js
```javascript 
var express = require("express");
var app = express();
var childProcess = require('child_process');


app.post("/webhooks/github", function (req, res) {
        deploy(res);
})

function deploy(res){
    childProcess.exec('cd /home && ./deploy.sh', function(err, stdout, stderr){
        if (err) {
         console.error(err);
         return res.send(500);
        }
        res.send(200);
      });
}
```


Feel free to visit my hosted demo app at http://marienfeld.online/
Admin Panel: http://marienfeld.online:3000/

**HAPPY SHOPPING**

<img src="https://media3.giphy.com/media/26xBJQgfNVrVEQes0/giphy.gif">
