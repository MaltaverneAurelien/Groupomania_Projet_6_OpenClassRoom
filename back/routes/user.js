const express = require('express');
const router = express.Router();
const passwordValidator = require('../middleware/passwordValidator');
const userCtrl = require('../controllers/user');
const limiter = require('../middleware/rateLimit');
const multer = require('../middleware/multer');
const { validateToken } = require("../middleware/auth");

router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', limiter.loginLimiter, userCtrl.login);
router.get('/userInfo', validateToken, userCtrl.userInfo);
router.post('/profileImg', validateToken, multer, userCtrl.profileImg);
router.get('/:id/avatar', userCtrl.avatar);
router.post('/modifyPassword', validateToken, userCtrl.modifyPassword);

module.exports = router;