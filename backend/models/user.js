const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  promotion: { type: String },
  bio: { type: String },
  study: { type: String },
  job: { type: String },
  avatar: { type: String }, // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);