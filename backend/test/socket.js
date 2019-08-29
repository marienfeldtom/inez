var should = require('should');
var io = require('socket.io-client');
var settings = require('../config.json');

var options = {
  transports: ['websocket'],
  'force new connection': true
};


var server = require('../server');
describe('Connect & Search', function () {
  it('Should return a list of entrys', function (done) {
    var client1 = io.connect("http://localhost:" + settings.socket.port, options);

    client1.on('connect', function (data) {
      client1.emit('query', "banane");
    });

    client1.on("result", data => {
      if (data[0].doc.produktname == "Banane") {
        client1.disconnect();
        done();
      }
    });

  });
});


after(done => {
  server.server.close();
});