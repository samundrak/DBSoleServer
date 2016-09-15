const ExtendImplementor = require('../../../ExtendImplementor');
const config = require('../../../../config.json.example');

module.exports = class Provider extends ExtendImplementor {

    constructor() {
        super();
        this.prepare = this.prepare.concat(['query']);
        this.config = config;
    }

    query(query, cb) {
        this.database.query(query, cb);
    }
}