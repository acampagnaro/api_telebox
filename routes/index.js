var express = require('express');
var router = express.Router();
var fs = require("fs");
var multer  = require('multer');
var multer  = require('multer')
var gm = require('gm');
const path = require('path');
var gm = require('gm');

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      gm(file)
        .resize(353, 257).write(null, function (err) {
        if (!err) console.log(' hooray! ');
        console.log('aaaaaa');
      });
        callback(null, './uploads');
    },
    onFileUploadStart: function (file) {
      var imagePath = file.path;
      console.log('aaaawsqdsws');
      gm(imagePath).resize(850, 850).quality(70).noProfile().write('public/uploads/spots/850x850/'+file.name, function (err) {
          if (!err) {
              gm(imagePath).resize(150, 150).quality(70).noProfile().write('public/uploads/spots/150x150/'+file.name, function (err) {
                  if (!err) {
                  }
                  else{
                      console.log('Error: '+err);
                  }
              });
          }
          else{
              console.log('Error: '+err);
          }
      });
    },
    filename: function (req, file, callback) {
        //callback(null, file.fieldname + '-' + Date.now());
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'));
        }
        callback(null, file.originalname)
    }

});
var upload = multer({ storage : storage}).array('files[]');

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
router.post('/images',        upload, ImagesController.create.bind(ImagesController));
// router.post('/images', function(req,res){
//     upload(req,res,function(err) {
//         console.log(req.body);
//         if(err) {
//             console.log(err);
//             return res.end("Error uploading file.");
//         }
//         res.end("File is uploaded");
//     });
// });
router.put ('/images/:_id',   ImagesController.update.bind(ImagesController));
router.delete('/images/:_id', ImagesController.delete.bind(ImagesController));
router.post('/sendmail',      EmailController.create.bind(EmailController));
router.get('/emails',         EmailController.findAll.bind(EmailController));

module.exports = router;
