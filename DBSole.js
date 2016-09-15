const ConfigBuilder = require('./src/ConfigBuilder');
const Server = require('./Server');
const Schema = require('./Schema');


module.exports = class DBSole {

    constructor() {
        this.configBuilder = new ConfigBuilder();
    }

    start(argv) {
        if (!this.configBuilder.isConfigExists()) {
            return this.promptConfigAndBootServer(Schema);
        }

        this.listenErrorEvents();
        this.handleOptions(argv);
    }

    handleOptions(argv) {
        switch (argv[0]) {
            case '--no-daemon':
                console.log(
                    'Server is not running on daemon, ' +
                    'if you want to run on daemon ' +
                    'start it again'
                );

                this.bootServer();
                break;

            case '--config':
                this.promptConfigAndBootServer(Schema);
                break;

            default:
                console.log(
                    'Server is running on daemon, ' +
                    'to kill it kill from bash or from ' +
                    'extension typing command \'end\' '
                );
                this.bootServer();

                //We will wait 5sec before going daemon
                //to see if any exception occur so that
                //user will be inform about it

                setTimeout(function () {
                    //noinspection JSUnresolvedFunction
                    require('daemon')();
                }, 2000);
                break;
        }
        return this;
    }

    bootServer() {
        return new Server()
            .run();
    }

    promptConfigAndBootServer() {
        this.configBuilder.promptForConfig(Schema, () => {
            this.bootServer();
        });
    }

    /**
     * Listen to error events if any occured
     * throw exception and just exit
     *
     */
    listenErrorEvents() {
        process.on('uncaughtException', function (e) {
            "use strict";
            console.error(e)
            process.exit(0);
        });
    }
}