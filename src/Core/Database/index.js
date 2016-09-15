const mysql = require('./Providers/MySql');

class Database {

    constructor(database) {
        this.database = database;
        this.database.init();
    }
}

module.exports = {
    interface: Database,
    provider: {
        mysql
    }
}