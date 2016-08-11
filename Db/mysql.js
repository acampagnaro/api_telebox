var mysql = require('mysql');
var db    = require('../config.js');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : db.db.user,
    password : db.db.password,
    database : 'telebox'
});

connection.connect();

module.exports = connection;
