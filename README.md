# INEZ Admin
  <img src="https://www.it-talents.de/thumbs/partner/edeka-digital-gmbh/original-500x173.jpg" width="150" title="INEZ"> <img src="https://www.it-talents.de/assets/img/logo_blue.svg" width="150" title="INEZ">
  

  
INEZ is a German Code Competition hosted by IT-Talents.de and EDEKA Digital. This repo contains the admin panel + client app for my submission in this contest.

* * *

In the admin panel EDEKA employees could add ingredients that can be use by the end user in their intelligent grocery list. 
The application also offers the Socket.io interface which is used by the app to gain ingredient information.

- [INEZ Admin](#inez-admin)
  * [Sequence Diagram](#sequence-diagram)
  * [Used dependencies](#used-dependencies)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Start application](#start-application)
    + [PM2](#pm2)

## Sequence Diagram
<img src="https://github.com/marienfeldtom/inez_admin/blob/master/diagram.svg">

## Used dependencies

### Backend
* Node.JS (javascript runtime)
* NPM (dependency management)
* ExpressJS (providing http admin panel)
* MustacheJS (templating/rendering data)
* lowdb (JSON database)
* CORS (only enabled for development purposes)
* fuse.js (fuzzy keyword search)
* socket.io (real time autocomplete and suggestions)

### Frontend
* Vue 3
* BootsrapVue
* socket.io-client

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

 ## Installation
 
 * `git clone <repository-url>` this repository 
 
 **Configuration:**
 Configs can be found in `backend/config.json`.
 
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

## Start Server

Start server
 ```javascript
node server.js
```
### PM2

If you want to keep the server running without having the SSH connection open, take a look at [pm2](https://www.npmjs.com/package/pm2)

Start server with pm2
```javascript
pm2 start server.js
```

## Start Vue Web App

```javascript
npm run serve
```
