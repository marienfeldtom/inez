# INEZ Admin

INEZ is a German Code Competition hosted by IT-Talents.de and EDEKA Digital. This repo contains the admin panel for my submission in this contest.
* * *
In this admin panel EDEKA employees could add ingredients that can be use by the end user in their intelligent grocery list. 
The application also offers the Socket.io interface which is used by the app to gain ingredient information.

## Used technologies/frameworks/dependencys

* Node.JS
* NPM
* ExpressJS
* MustacheJS
* lowdb (JSON database)
* CORS (only enabled for development purposes)

 ## How to get admin panel running
 
 Install dependencys
```javascript
npm install
```

Start server
 ```javascript
node server.js
```

If you want to keep the server running without having the SSH connection open, take a look at [pm2](https://www.npmjs.com/package/pm2)
* * *
Start server with pm2
```javascript
pm2 start server.js
```
