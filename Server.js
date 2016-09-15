const app = require('express')();
const server = require('http').Server(app);

const DatabaseService = require('./src/Core/Database');
const SocketService = require('./src/Core/Socket');

const config = require('./config.json.example');


module.exports = class Server {

    constructor() {
        const databaseService = new DatabaseService.interface(
            DatabaseService.provider[config.default.database]
        );
        this.database = databaseService.database;
        process.env.PORT = process.env.PORT || config.server.port;
    }

    run(cb) {
        const socketService = new SocketService.interface(
            SocketService.provider.SocketIO
        );

        socketService.socket.setServer(server);
        this.socket = socketService.socket.get();
        this.socket.on('connection', this.socketHandler(this));
        server.listen(process.env.PORT);
        console.log(`Server is running on port ` + process.env.PORT);
        if (cb) cb(server);
        return this;
    }

    socketHandler(context) {
        return socket => {
            socket.on('query', data => {
                if (data.query === 'end') {
                    socket.emit('query_response', {
                        success: 1,
                        result: 'Server closed.. start again manually..'
                    });
                    process.exit(0);
                }


                context.database.query(data.query || '', (e, r) => {
                    let response = {
                        success: e ? 0 : 1,
                        result: e || r
                    };

                    socket.emit('query_response', response);
                });
            });
        }
    }

}