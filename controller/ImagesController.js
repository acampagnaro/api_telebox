var ImagesModel = require('../model/ImagesModel');
var Promise = require('bluebird');

function ImagesController(Model) {
  this.Model = Promise.promisifyAll(Model);
}

ImagesController.prototype.create = function(req, res) {
  var data = req.body;

 // if(req.file == undefined){
  //     res.status(404);
  //     return res.json('Imagem inválida');
  // }

  // data.image = req.file.filename;

  data.name = 'teste';

  this.Model.createAsync(data)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      console.log(err)
    });
};

ImagesController.prototype.findOne = function(req, res) {
  var _id = req.params._id;

  this.Model.findOneAsync(_id)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      console.log(err)
    });
};

ImagesController.prototype.findAll = function(req, res) {
  var data = req.body;

  this.Model.findAllAsync()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      console.log(err)
    });
};

ImagesController.prototype.update = function(req, res) {
  var data = req.body,
      _id = req.params.id;

  this.Model.updateAsync(data, _id)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      console.log(err)
    });
};


ImagesController.prototype.delete = function(req, res) {
  var _id = req.params.id;

  this.Model.deleteAsync(_id)
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      console.log(err)
    });
};

module.exports = new ImagesController(ImagesModel);

