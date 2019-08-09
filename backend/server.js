var express = require("express");
var app = express();
const low = require('lowdb')
const Fuse = require('fuse.js')
var cors = require('cors');
const FileSync = require('lowdb/adapters/FileSync')
const server = require('http').createServer();
const io = require('socket.io')(server);
var settings = require('./config.json');

const adapter = new FileSync(settings.file)
const db = low(adapter)

app.use(express.urlencoded())
app.use(cors());

var mustacheExpress = require('mustache-express');

app.use(express.static('public'));
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// Rendert die Ansicht zum Hinzufügen von Lebensmitteln
app.get('/', function (req, res) {
    db.read();
    res.render('index.html');
});

// Rendert die Ansicht zur Übersicht aller Lebensmittel
app.get('/all', function (req, res) {
    db.read();
    var idx = 1;
    res.render('all.html', {
        "lebensmittel": db.get('lebensmittel').value(), "idx": function () {
            return idx++;
        }
    });
});

var search = function(query){
    db.read();
    let entries = db.get('lebensmittel').value();
    var options = {
        shouldSort: true,
        findAllMatches: true,
        keys: ['produktname', 'synonyme'],
        threshold: 0.2
        //keys: [{name: 'produktname', weight: 0.7}, {name: 'synonyme', weight: 0.7}]
    }
    var fuse = new Fuse(entries, options);
   return fuse.search(query);
}

// GET: Suchen nach Lebensmitteln
app.get('/search', function (req, res) {
    res.json(search(req.query.key));
});


// POST: Eintragen der Lebensmittel in die Datenbank
app.post('/upload', function (req, res) {
    db.read();
    //Prüfen ob bereits vorhanden
    if (db.get('lebensmittel').find({ produktname: req.body.produktname }).value()) {
        res.render('index.html', { exists: true });
    }
    //Sonst eintragen
    else {
        var item = req.body;
        item.synonyme = item.synonyme.split(' ');
        item.einheiten = item.einheiten.split(' ');
        db.get('lebensmittel')
            .push(item)
            .write();
        res.render('index.html', { done: true });
    }
});


io.on('connection', client => {
    console.log("Connection!");
    client.on('query', data => {
         console.log(data); 
         client.emit('result', search(data));
    });
    client.on('disconnect', () => { console.log("Disconnect!"); });
  });
  server.listen(settings.socket.port);


app.listen(settings.webserver.port, settings.webserver.ip, function () {
    console.log("Working on " + settings.webserver.ip + ":" + settings.webserver.port);
});
