import SocketIOClient from 'socket.io-client';

export default class SocketListener {
    constructor(port) {
        this.socket = SocketIOClient(port);
    }
    playGameOnMessage(game) {
        this.socket.on('message', (data) => {
            game(data);
        });
    }
}