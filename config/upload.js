var multer  = require('multer');
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/upload');
    },
    filename: function (req, file, callback) {
        //callback(null, file.fieldname + '-' + Date.now());
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(new Error('Only image files are allowed!'));
        }
        callback(null, file.originalname)
    }
});

module.exports = storage;
