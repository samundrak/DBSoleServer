const mysql = require('mysql');
const DatabaseProvider = require('../');

const databaseProvider = new DatabaseProvider();

databaseProvider.extend({
    init (){
        "use strict";
        this.database = mysql.createConnection({
            host: this.config.database.mysql.hostname,
            user: this.config.database.mysql.username,
            password: this.config.database.mysql.password,
            database: this.config.database.mysql.database
        });
        this.database.connect();
    },

    get(){
        "use strict";
        return this.database;
    }

});
module.exports = databaseProvider;
