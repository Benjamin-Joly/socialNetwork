const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.loginUser);
router.get('/valid', auth, userCtrl.validSession);
router.get('/user', auth, userCtrl.getOneUser);

module.exports = router;