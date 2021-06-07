const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.post('/signup', userCtrl.createUser);
router.post('/login', userCtrl.loginUser);
router.post('/admin', userCtrl.loginAdmin);
router.get('/valid', auth, userCtrl.validSession);
router.get('/user', auth, userCtrl.getOneUser);
router.get('/users', adminAuth, userCtrl.getUsers);

module.exports = router;