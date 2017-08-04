import SocketIO from 'socket.io-client';

const PORT = 'http://localhost:4000';

class SocketListener {
	constructor() {
		this.socket = SocketIO(PORT).connect();
		this.socket.on('connect', () => console.log(`Listen for messages on ${PORT}`));
	}
	onDisconnect(callback) {
		this.socket.on('disconnect', () => {
			console.log(`Disconnected from ${PORT} game speed will be reset to 3s`)
			callback();
		})
	}
	onListenOnMessage(callback) {
		this.socket.on('message', (data) => {
			callback(data);
		});
	}
}

export default SocketListener;
