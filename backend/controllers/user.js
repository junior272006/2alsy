const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.CreateUser = async (req, res) => {
  try {
    // 1️⃣ Récupération des données
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

    console.log('BODY :', req.body);
    console.log('FILE :', req.file);

    // 2️⃣ Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Création utilisateur
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
      avatar: req.file ? req.file.path : ''
    });

    // 4️⃣ Sauvegarde MongoDB
    await user.save();

    // 5️⃣ Réponse
    res.status(201).json({
      message: 'Inscription réussie',
      user
    });

  } catch (error) {
    console.log('ERREUR :', error);
    res.status(400).json({ error: error.message });
  }
};
