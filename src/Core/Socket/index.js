const SocketIO = require('./Providers/socketio');

class Socket {

    constructor(socket) {
        this.socket = socket;
        this.socket.init();
    }
}

module.exports = {
    interface: Socket,
    provider: {
        SocketIO
    }
}