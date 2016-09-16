const ExtendImplementor = require('../../../ExtendImplementor');
const ConfigBuilder = require('../../../ConfigBuilder');

const config = new ConfigBuilder().getConfig();

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