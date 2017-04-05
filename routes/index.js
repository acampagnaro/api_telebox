var express = require('express');
var router  = express.Router();
var fs      = require("fs");
var multer  = require('multer');
var storage = require('../config/upload');
const junk = require('junk');

var upload = multer({ storage : storage }).array('files[]');

var ImagesController = require('../controller/ImagesController');
var EmailController = require('../controller/EmailController');
var LoginController = require('../controller/LoginController');

router.get('/images', function(req, res){
    // Retorna um array com string dos arquivos da pasta pública.
    fs.readdir('./public/dest', function(err, fotos){
        console.log(err)
        res.json(fotos.filter(junk.not));
    });
});

//router.get ('/images',        ImagesController.findAll.bind(ImagesController));
router.get ('/',              function(req, res){ res.send('Hello World!');});
router.get ('/images/:_id',   ImagesController.findOne.bind(ImagesController));
router.post('/images',        upload,ImagesController.create.bind(ImagesController));
router.put ('/images/:_id',   ImagesController.update.bind(ImagesController));
router.delete('/images/:_id', ImagesController.delete.bind(ImagesController));
router.post('/sendmail',      EmailController.create.bind(EmailController));
router.get('/emails',         EmailController.findAll.bind(EmailController));
router.post('/login',         LoginController.authentication.bind(LoginController));

module.exports = router;
