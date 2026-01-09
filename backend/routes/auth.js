const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.post('/forgot-password', authCtrl.forgotPassword);
router.post('/reset-password/:token', authCtrl.resetPassword);

module.exports = router;
