const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const config = require('./config.json');
const db = require('./db');

io.on('connection', socket => {
    socket.on('query', data => {

        if(data.query === 'end'){
            socket.emit('query_response',{
                success : 1,
                result : 'Server closed.. start again manually..'
            });
            process.exit(0);
        }


        db(data.query || '' , (e, r) => {
            let response;
            if (e) {
                response = {
                    success: 0,
                    result: e
                }
            } else {
                response = {
                    success: 1,
                    result: r
                }
            }
            socket.emit('query_response', response);
        });
    });
});
server.listen(9393);
require('daemon')();