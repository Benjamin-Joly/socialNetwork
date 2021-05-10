const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');

router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;