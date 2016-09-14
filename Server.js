const app = require('express')();
const server = require('http').Server(app);

const DatabaseService = require('./src/Core/Database');
const SocketService = require('./src/Core/Socket');

const config = require('./config.json');

const databaseService = new DatabaseService.interface(DatabaseService.provider[config.default.database]);
const socketService = new SocketService.interface(SocketService.provider.SocketIO);

module.exports = class Server {

    constructor() {
        this.database = databaseService.database;
        process.env.PORT = process.env.PORT || config.server.port;
    }

    run(cb) {
        socketService.socket.setServer(server);
        this.socket = socketService.socket.get();
        this.socket.on('connection', this.socketHandler);
        server.listen(process.env.PORT);
        console.log(`Server is running on port ` + process.env.PORT);
        if (cb) cb(server);
        return this;
    }

    socketHandler(socket) {
        socket.on('query', data => {

            if (data.query === 'end') {
                socket.emit('query_response', {
                    success: 1,
                    result: 'Server closed.. start again manually..'
                });
                process.exit(0);
            }


            this.database.query(data.query || '', (e, r) => {
                let response = {
                    success: 0,
                    result: e || r
                };
                socket.emit('query_response', response);
            });
        });
    }

    handleOptions(argv) {
        switch (argv[0]) {
            case '--no-daemon':
                console.log('Server is not running on daemon, if you want start it again');
                break;
            case '--config':
                console.log('This Option will be available soon');
                new Server().run();
                break;
            default:
                console.log('Server is running on daemon, to kill it kill from bash or from extension typing command \'end\' ')
                require('daemon')();
                break
        }
        return this;
    }
}