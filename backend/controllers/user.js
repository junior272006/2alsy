const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
exports.CreateUser = async (req, res) => {
  try {
    console.log(' BODY:', req.body);
    console.log(' FILE:', req.file);

    // Extraire les données (en gérant le cas où Cloudinary mélange tout dans body)
    const {
      firstname,
      lastname,
      email,
      phone,
      password,
      promotion,
      bio,
      study,
      job,
      path // Cloudinary met parfois le path dans body
    } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Mot de passe manquant' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Gérer l'avatar : soit req.file.path, soit req.body.path
    let avatar = [];
    if (req.file && req.file.path) {
      avatar = [req.file.path];
    } else if (path) {
      avatar = [path]; // Si Cloudinary a mis le path dans body
    }

    console.log(' Avatar URL:', avatar);

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
    console.log(' User sauvegardé:', user._id);

    res.status(201).json({
      message: 'Utilisateur créé',
    });

  } catch (err) {
    console.error(' ERREUR:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.LoginUser= (req,res,next) => {
 User.findOne({email:req.body.email})
 .then((user)=>{
  if(user===null){
   return res.status(401).json({message:'Utilisateur introuvable'})
  }

  bcrypt.compare(req.body.password,user.password)
 .then((valid)=> {
  if (!valid){
    return res.status(401).json({message:'Utilisateur introuvable'})
  }
  else{
res.status(200).json({
id:user._id,
email:user.email,
token:jwt.sign(
   { id: user._id},
   process.env.JWT_SECRET,
  { expiresIn: '24h' }
)
})
  }
 })
  .catch(err => res.status(500).json({ message: 'Erreur serveur', error: err.message }))
 })
.catch(err => res.status(500).json({ message: 'Erreur serveur', error: err.message }))
}

//new thing
