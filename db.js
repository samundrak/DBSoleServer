const conf = require('./config.json').mysql;
const mysql = require('mysql');
module.exports = (query, cb) =>
{
    let connection = mysql.createConnection({
        host: conf.hostname,
        user: conf.username,
        password: conf.password,
        database: conf.database
    });
    connection.connect();
    connection.query(query,cb);
}
