var mysql = require('../Db/mysql');

function ImagesModel() {

}

ImagesModel.prototype.create = function(data, callback) {
  mysql.query('INSERT INTO images SET ?', {name: data.name}, function(err, rows, fields) {
    callback(err, rows);
  });
};

ImagesModel.prototype.findOne = function(_id, callback) {
  mysql.query('SELECT id, name FROM images WHERE id = ' + _id, function(err, rows, fields) {
    callback(err, rows);
  });
};

ImagesModel.prototype.findAll = function(callback) {
  mysql.query('SELECT id, name FROM images', function(err, rows, fields) {
    callback(err, rows);
  });
};

ImagesModel.prototype.update = function(data, _id, callback) {
  mysql.query('UPDATE users SET name = ?, WHERE id = ?', [data.name, _id], function(err, rows) {
    callback(err, rows);
  });
};

ImagesModel.prototype.delete = function(_id, callback) {

};

module.exports = new ImagesModel();
