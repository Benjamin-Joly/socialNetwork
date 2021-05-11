const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/messageCtrl');
const auth = require('../middleware/auth');

router.post('/', auth , messageCtrl.createMessage);
router.get('/', auth , messageCtrl.readMessage);

module.exports = router;