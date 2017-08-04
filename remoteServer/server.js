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

socketio.listen(server).on('connection', (socket) => {
	socket.on('send speed', function(data) {
		this.broadcast.send({
			speed: Math.abs(data)
		})
	});
});
