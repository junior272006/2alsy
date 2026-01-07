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

    if (!password) {
      return res.status(400).json({ error: 'Mot de passe manquant' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
      avatar: req.file ? req.file.path : null,
    });

    await user.save();

    res.status(201).json({
      message: 'Utilisateur créé',
      user: {
        id: user._id,
        firstname: user.firstname,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (err) {
    console.error('❌ ERREUR:', err);
    res.status(500).json({ error: err.message });
  }
};
