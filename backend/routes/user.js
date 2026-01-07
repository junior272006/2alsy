const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/user');
const upload = require('../config/cloudinary');

router.post(
  '/signup',
  upload.single('avatar'), // TOUJOURS AVANT le controller
  Ctrl.CreateUser
);



module.exports = router;