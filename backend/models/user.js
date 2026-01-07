const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  promotion: { type: String, required: true },
  bio: { type: String, required: true },
  study: { type: String, required: true },
  job: { type: String, required: true },
  avatar: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);