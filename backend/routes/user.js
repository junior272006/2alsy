const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/user');
const upload = require('../config/cloudinary');

router.post(
  '/signup',
  upload.single('avatar'), // TOUJOURS AVANT le controller
  Ctrl.CreateUser
);


router.post('/test-upload', upload.single('avatar'), (req, res) => {
  console.log('Body:', req.body);
  console.log('File:', req.file);
  res.json({ 
    body: req.body, 
    file: req.file ? 'File received' : 'No file' 
  });
});

module.exports = router;