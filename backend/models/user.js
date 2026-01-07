const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true },
  promotion: String,
  bio: String,
  study: String,
  job: String,
  avatar: [String]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);