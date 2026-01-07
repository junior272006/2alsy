const User = require('../models/user');

exports.CreateUser = async (req, res) => {
  try {
    console.log('BODY REÇU:', req.body);

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    });

    const savedUser = await user.save();

    console.log('USER SAUVÉ:', savedUser);

    res.status(201).json({ message: 'OK', user: savedUser });

  } catch (err) {
    console.error('❌ ERREUR MONGO:', err);
    res.status(500).json({ error: err.message });
  }
};
