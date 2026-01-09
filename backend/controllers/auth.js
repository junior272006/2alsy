const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const transporter = require('../config/mailer');

//  Envoyer email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Email introuvable" });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: '"Alumni Connect" <no-reply@alumni.com>',
      to: user.email,
      subject: 'Réinitialisation de mot de passe',
      html: `
        <p>Bonjour ${user.firstname},</p>
        <p>Clique sur ce lien pour réinitialiser ton mot de passe :</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Ce lien expire dans 15 minutes.</p>
      `,
    });

    res.json({ message: 'Email envoyé avec succès' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

//  Réinitialiser mot de passe
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: 'Token invalide ou expiré' });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: 'Mot de passe mis à jour avec succès' });

  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
