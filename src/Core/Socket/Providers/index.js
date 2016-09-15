const ExtendImplementor = require('../../../ExtendImplementor');

module.exports = class Provider extends ExtendImplementor {

    constructor() {
        super();
    }

    setServer(httpServer) {
        "use strict";
        this.socket = this.socket(httpServer);
    }
    
}