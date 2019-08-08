# INEZ Admin

INEZ is a German Code Competition hosted by IT-Talents.de and EDEKA Digital. This repo contains the admin panel for my submission in this contest.
* * *
In this admin panel EDEKA employees could add ingredients that can be use by the end user in their intelligent grocery list. 
The application also offers the Socket.io interface which is used by the app to gain ingredient information.

## Used technologies/frameworks/dependencies

* Node.JS (javascript runtime)
* NPM (dependency management)
* ExpressJS (providing http admin panel)
* MustacheJS (templating/rendering data)
* lowdb (JSON database)
* CORS (only enabled for development purposes)
* fuse.js (fuzzy keyword search)
* socket.io (real time autocomplete and suggestions)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)

 ## Installation
 
 * `git clone <repository-url>` this repository 
 
 **Configuration:**
 Configs can be found in `config.json`.
 
 Install dependencies
```javascript
npm install
```

## Running / Development

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
