const conf = require('./config.json').mysql;
const mysql = require('mysql');

let connection = mysql.createConnection({
    host: conf.hostname,
    user: conf.username,
    password: conf.password,
    database: conf.database
});
connection.connect();

module.exports = (query, cb) => {
    return connection.query(query, cb);
}
