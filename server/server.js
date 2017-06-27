var fs = require('fs'),
    http = require('http'),
    socketio = require('socket.io');

var server = http
    .createServer((req, res) => {
      res.writeHead(200, { 'Content-type': 'text/html'});
      res.end(fs.readFileSync(__dirname + '/server/index.html'));
    })
    .listen(4000, () => console.log('Listening at: http://localhost:4000'));
var s = [];
socketio.listen(server).on('connection', (socket) => {
    if(s.indexOf(socket.id) < 0) {
        s.push(socket.id);
    }
console.log(s)
  socket.on('join', function(data) {
    s.forEach((id) => {
        if(socket.id !== id) {
            socket.to(id).emit('message', {speed: data})
        }
    })
  });
});
