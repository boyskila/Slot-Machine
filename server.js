var fs = require('fs'),
    http = require('http'),
    socketio = require('socket.io');

var server = http
    .createServer((req, res) => {
      res.writeHead(200, { 'Content-type': 'text/html'});
      res.end(fs.readFileSync(__dirname + '/server/index.html'));
    })
    .listen(4000, () => console.log('Listening at: http://localhost:4000'));

socketio.listen(server).on('connection', (socket) => socket.emit('message', {speed:3}));