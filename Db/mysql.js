var mysql = require('mysql');
var db    = require('../config.js');

var connection = mysql.createConnection({
    host     : db.db.host,
    user     : db.db.user,
    password : db.db.password,
    database : db.db.database
});

connection.connect();

module.exports = connection;
