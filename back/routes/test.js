const express = require('express');
const router = express.Router();
const testCtrl = require('../controllers/testCtrl');
const auth = require('../middleware/auth');

router.post('/post',auth, testCtrl.createPost);

module.exports = router;