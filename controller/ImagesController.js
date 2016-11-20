var ImagesModel = require('../model/ImagesModel');
var Promise = require('bluebird');

var gulp = require('gulp');
var imageResize = require('gulp-image-resize');

gulp.task('image', function(){
  gulp.src('./public/upload/*.jpg')
      .pipe(imageResize({
        width : 360,
        height : 247,
        crop : true,
        upscale : false
      }))
      .pipe(gulp.dest('public/dest'));
});

gulp.task('default', ['image'],function(){

});

function ImagesController(Model) {
  this.Model = Promise.promisifyAll(Model);
}

ImagesController.prototype.create = function(req, res) {
  var data = req.body;
  data.name = 'teste';

  this.Model.createAsync(data)
    .then(function(result) {
      gulp.start('default');
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
