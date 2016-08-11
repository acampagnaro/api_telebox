var mysql = require('../Db/mysql');

function EmailsModel() {

}

EmailsModel.prototype.create = function(data, callback) {
    mysql.query('INSERT INTO emails SET ?',
        {
            email: data.email,
            title: data.title,
            message: data.message,
            response: data.response
        }, function(err, rows, fields) {
        callback(err, rows);
    });
};

module.exports = new EmailsModel();

