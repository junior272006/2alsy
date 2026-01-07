const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.CreateUser = async (req, res, next) => {
  try {
    const { firstname, lastname, password, promotion, bio, study, job, email, phone } = req.body;
    
    console.log('Données:', req.body);
    console.log('Fichier uploadé:', req.file);
    
    // Vérifier que tous les champs requis sont présents
    if (!firstname || !lastname || !password || !email || !phone) {
      return res.status(400).json({ 
        error: 'Tous les champs obligatoires doivent être remplis' 
      });
    }

    // Hasher le mot de passe
    const hash = await bcrypt.hash(password, 10);

    // Créer l'utilisateur avec l'URL de l'avatar depuis Cloudinary
    const user = new User({
      firstname,
      lastname,
      password: hash,
      avatar: req.file ? req.file.path : null, // URL Cloudinary
      promotion,
      bio,
      study,
      job,
      email,
      phone,
    });

    await user.save();
    
    res.status(201).json({ 
      message: 'Utilisateur créé avec succès',
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Erreur:', error);
    
    // Gestion des erreurs spécifiques
    if (error.code === 11000) {
      return res.status(400).json({ error: "Cet email existe déjà" });
    }
    
    res.status(400).json({ error: error.message });
  }
};