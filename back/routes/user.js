const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const rateLimit = require('../middleware/rateLimit');

router.post('/signup', rateLimit.signupLimiter, userCtrl.createUser);
router.post('/login', rateLimit.userLogLimiter, userCtrl.loginUser);
router.post('/admin', rateLimit.userLogLimiter, userCtrl.loginAdmin);
router.get('/valid', auth, userCtrl.validSession);
router.get('/user', auth, userCtrl.getOneUser);
router.put('/user/self', auth, userCtrl.updateSelf);
router.delete('/user/self', auth, userCtrl.deleteSelf);

router.get('/users', adminAuth, userCtrl.getUsers);
router.delete('/admin/users', adminAuth, userCtrl.deleteUser);

module.exports = router;