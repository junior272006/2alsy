const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.CreateUser = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      promotion,
      bio,
      study,
      job
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Récupérer l'avatar si présent
    const avatar = req.file ? [req.file.path] : [];

    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      promotion,
      bio,
      study,
      job,
      avatar
    });

    await user.save();

    res.status(201).json({
      message: 'Utilisateur créé',
    });

  } catch (err) {
    console.error('ERREUR:', err);
    res.status(500).json({ error: err.message });
  }
};