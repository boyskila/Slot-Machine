var fs = require('fs'),
    http = require('http'),
    socketio = require('socket.io'),
    PORT = 4000;

var server = http
    .createServer((req, res) => {
      res.writeHead(200, { 'Content-type': 'text/html'});
      res.end(fs.readFileSync(__dirname + '/index.html'));
    })
    .listen(PORT, () => console.log(`Listening at: port ${PORT}`));

var socketIds = [];
socketio.listen(server).on('connection', (socket) => {
    if(socketIds.indexOf(socket.id) < 0) {
        socketIds.push(socket.id);
    }
    socket.on('send speed', function(data) {
        socketIds.forEach((id) => {
            if(socket.id !== id) {
                //pass speed to slot machine
                socket.to(id).emit('message', {
                    speed: Math.abs(data)
                })
            }
        })
    });
});
