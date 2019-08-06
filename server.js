var express = require("express");
var app = express();
const low = require('lowdb')
var cors = require('cors');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('lebensmittel.json')
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
    res.render('all.html', { "lebensmittel": db.get('lebensmittel').value(), "idx": function() {
        return idx++;
    } });
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
        res.render('index.html', {done: true});
    }
});

app.listen(3000, '0.0.0.0', function () {
    console.log("Working on port 3000");
});