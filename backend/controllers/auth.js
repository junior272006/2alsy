const SibApiV3Sdk = require('sib-api-v3-sdk');
const dotenv = require('dotenv');
const User = require('../models/user'); // ton modèle
const crypto = require('crypto');
const bcrypt = require('bcrypt');

dotenv.config();

// Config Brevo
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_SMTP_PASS;
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// Forgot password
async function forgotPassword(email) {
  const user = await User.findOne({ email });
  if (!user) return { success: true, message: 'Si cet email existe, un lien a été envoyé' };

  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1h
  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset?token=${token}`;

  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
    to: [{ email }],
    sender: { email: 'no-reply@twoalsy.com', name: 'TwoAlsy' },
    subject: 'Réinitialisation de votre mot de passe',
    htmlContent: `<p>Bonjour,</p>
      <p>Cliquez sur ce lien pour réinitialiser votre mot de passe :</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Ce lien est valable 1 heure.</p>`,
  });

  try {
    await emailApi.sendTransacEmail(sendSmtpEmail);
    return { success: true, message: 'Si cet email existe, un lien a été envoyé' };
  } catch (err) {
    console.error('Erreur envoi email Brevo:', err);
    return { success: false, message: 'Impossible d’envoyer l’email' };
  }
}

// Reset password
async function resetPassword(token, newPassword) {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return { success: false, message: 'Token invalide ou expiré' };

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { success: true, message: 'Mot de passe réinitialisé avec succès' };
}

module.exports = { forgotPassword, resetPassword };
