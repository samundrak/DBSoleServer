const Server = require('./Server');

new Server()
    .run()
    .handleOptions(process.argv.splice(2));