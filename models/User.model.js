const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  cash: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
