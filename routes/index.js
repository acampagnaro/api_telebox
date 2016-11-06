var express = require('express');
var router  = express.Router();
var fs      = require("fs");
var multer  = require('multer');
var gulp = require('gulp');
var imageResize = require('gulp-image-resize');

var imagens = multer({ dest: 'uploads/' })
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        //callback(null, file.fieldname + '-' + Date.now());
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'));
        }
        callback(null, file.originalname)
    }
});

var upload = multer({ storage : storage }).array('files[]');

gulp.task('image', function(){
    gulp.src('1.jpg')
        .pipe(imageResize({
            width : 360,
            height : 247,
            crop : true,
            upscale : false
        }))
        .pipe(gulp.dest('dest'));
});

gulp.task('default', ['image'],function(){

});

var ImagesController = require('../controller/ImagesController');
var EmailController = require('../controller/EmailController');

router.get('/images', function(req, res){
    // Retorna um array com string dos arquivos da pasta pública.
    fs.readdir('./uploads', function(err, fotos){
        res.json(fotos);
    });
});

//router.get ('/images',        ImagesController.findAll.bind(ImagesController));
router.get ('/images/:_id',   ImagesController.findOne.bind(ImagesController));
router.post('/images',        upload,ImagesController.create.bind(ImagesController));
router.put ('/images/:_id',   ImagesController.update.bind(ImagesController));
router.delete('/images/:_id', ImagesController.delete.bind(ImagesController));
router.post('/sendmail',      EmailController.create.bind(EmailController));
router.get('/emails',         EmailController.findAll.bind(EmailController));

module.exports = router;
