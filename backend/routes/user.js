const express = require('express');
const router = express.Router();
const Ctrl = require('../controllers/user');
const upload = require('../config/cloudinary');

router.post('/signup', (req, res, next) => {
  console.log('📦 Body avant multer:', req.body);
  console.log('📁 Headers:', req.headers);
  next();
}, upload.single('avatar'), (req, res, next) => {
  console.log('📦 Body après multer:', req.body);
  console.log('🖼️ File après multer:', req.file);
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  next();
}, Ctrl.CreateUser);

router.post('/test-upload', upload.single('avatar'), (req, res) => {
  console.log('Body:', req.body);
  console.log('File:', req.file);
  res.json({ 
    body: req.body, 
    file: req.file ? 'File received' : 'No file' 
  });
});

module.exports = router;