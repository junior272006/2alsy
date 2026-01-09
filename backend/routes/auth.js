// backend/routes/auth.js
const express = require('express');
const { forgotPassword, resetPassword } = require('../controllers/auth');

const router = express.Router();

// Mot de passe oublié
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const result = await forgotPassword(email);
  res.status(result.success ? 200 : 500).json(result);
});

// Réinitialisation du mot de passe
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  const result = await resetPassword(token, password);
  res.status(result.success ? 200 : 400).json(result);
});

module.exports = router;
