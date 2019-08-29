var express = require("express");
var app = express();
const Fuse = require('fuse.js')
var cors = require('cors');
const server = require('http').createServer();
const io = require('socket.io')(server);
var settings = require('./config.json');
var PouchDB = require('pouchdb');
var db2 = new PouchDB('lebensmittel');
var mustacheExpress = require('mustache-express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static('public'));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Rendert die Ansicht zum Hinzufügen von Lebensmitteln
app.get('/', function (req, res) {
    res.render("index.html");
});

// Rendert die Ansicht zur Übersicht aller Lebensmittel
app.get('/all', function (req, res) {
    db2.allDocs({ include_docs: true }).then(function (lebensmittel) {
        var idx = 0;
        res.render('all.html', {
            "lebensmittel": lebensmittel.rows, "idx": function () {
                return idx++;
            }
        });
    });
});

// POST: Eintragen der Lebensmittel in die Datenbank
app.post('/upload', function (req, res) {
    var item = req.body;
    item.synonyme = item.synonyme.split(' ');
    item.einheiten = item.einheiten.split(' ');
    item._id = item.produktname;

    db2.put(item).then(function () {
        res.render('index.html', { done: true });
    }).catch(function (err) {
        res.render('index.html', { exists: true });
    });
});

var search = function (query) {
    return new Promise((resolve, reject) => {
        db2.allDocs({ include_docs: true }).then(function (lebensmittel) {
            var options = {
                shouldSort: true,
                findAllMatches: true,
                keys: ['doc.produktname', 'doc.synonyme'],
                threshold: 0.2
            }
            var fuse = new Fuse(lebensmittel.rows, options);
            resolve(fuse.search(query));
        });
        if (false) {
            reject("FAILURE")
        }
    })

}

io.on('connection', client => {
    console.log("Connection!");
    client.on('query', data => {
        search(data).then(function (result) {
            client.emit('result', result);
        }).catch(function (err) {
            console.log(err);
        });
    });
    client.on('disconnect', () => { console.log("Disconnect!"); });
});
server.listen(settings.socket.port, settings.socket.ip,function () {
    console.log("Socket Server working on " + settings.socket.ip + ":" + settings.socket.port);
});


app.listen(settings.webserver.port, settings.webserver.ip, function () {
    console.log("Webserver working on " + settings.webserver.ip + ":" + settings.webserver.port);
});

module.exports = {
    server: server
    };

