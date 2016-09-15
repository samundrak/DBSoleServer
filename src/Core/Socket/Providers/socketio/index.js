const io = require('socket.io');
const SocketProvider = require('../');

const socketProvider = new SocketProvider();

socketProvider.extend({
    init (){
        "use strict";
        this.socket = io;
    },

    get(){
        "use strict";
        return this.socket;
    }

});
module.exports = socketProvider;