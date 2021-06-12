const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
    "image/jpg":"jpg",
    "image/jpeg":"jpg",
    "image/png":"png"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '/img'));
        //console.log(file);
    },
    filename: (req, file, callback) => {
        const orGname = file.originalname.split(' ').join('_');
        const terms = '.jpg' || '.jpeg' || '.png';
        const search = orGname.indexOf(terms);
        let name ;
        if(search >= 0){name = orGname.split('.')[0];}
        else{name = orGname}
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${name}${Date.now()}.${extension}`);
    }
});

module.exports = multer({
    storage :storage,
    limits : {fileSize : 1000000}
}).single('image');