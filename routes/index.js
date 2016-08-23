var express = require('express');
var router = express.Router();
var fs = require("fs");


var multer  = require('multer')

var storage =   multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        //callback(null, file.fieldname + '-' + Date.now());
        callback(null, file.originalname)
    }
});
var upload = multer({ storage : storage}).array('files[]');

var ImagesController = require('../controller/ImagesController');
var EmailController = require('../controller/EmailController');

router.get('/a', function(req, res){
    // Retorna um array com string dos arquivos da pasta pública.

    fs.readdir('./uploads', function(err, fotos){
        //res.render('index', {fotos: fotos});
        res.json(fotos);
        // if (!err)
        //     console.log(fotos);
        // else
        //     throw err;
    });
});


router.get ('/images',        ImagesController.findAll.bind(ImagesController));
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

module.exports = router;
