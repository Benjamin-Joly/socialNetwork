const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/messageCtrl');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const isauthor = require('../middleware/isauthor');

router.post('/', auth , messageCtrl.createMessage);
router.get('/', auth , messageCtrl.readMessage);
router.delete('/', auth , isauthor ,messageCtrl.deleteMessage);
router.put('/', auth , isauthor , messageCtrl.updateMessage);
router.get('/', adminAuth , messageCtrl.readMessage);


module.exports = router;