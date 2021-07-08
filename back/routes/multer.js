const express = require("express");
const router = express.Router();
const multerConfig = require('../multer-config');
const uploadCtrl = require('../controllers/uploadCtrl');

router.post("/uploads", multerConfig, uploadCtrl.uploadFile);
router.get("/uploads", multerConfig, uploadCtrl.getFile);

module.exports = router;