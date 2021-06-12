const multer = require("multer");
const path = require('path');

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../img/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-profilePic-${file.originalname}`);
  },
});

const uploadRes = (req, res, next) => {
  console.log(req.body);
  !req.body ? res.status(400).send({message:'request malformed'}) : res.status(200).send({message:'lets see...'})
}

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;