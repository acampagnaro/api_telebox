var express = require('express');
var router  = express.Router();
var fs      = require("fs");
var multer  = require('multer');
var storage = require('../config/upload');

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

var upload = multer({ storage : storage }).array('files[]');

var ImagesController = require('../controller/ImagesController');
var EmailController = require('../controller/EmailController');

router.get('/images', function(req, res){
    // Retorna um array com string dos arquivos da pasta pública.
    fs.readdir('./public/upload', function(err, fotos){
        res.json(fotos);
    });
    gulp.start('default');
});

//router.get ('/images',        ImagesController.findAll.bind(ImagesController));
router.get ('/images/:_id',   ImagesController.findOne.bind(ImagesController));
router.post('/images',        upload,ImagesController.create.bind(ImagesController));
router.put ('/images/:_id',   ImagesController.update.bind(ImagesController));
router.delete('/images/:_id', ImagesController.delete.bind(ImagesController));
router.post('/sendmail',      EmailController.create.bind(EmailController));
router.get('/emails',         EmailController.findAll.bind(EmailController));

module.exports = router;
