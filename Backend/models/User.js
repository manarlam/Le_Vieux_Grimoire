const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // empêche les doublons d’e-mails
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // validation de format d’e-mail
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // exemple : mot de passe d'au moins 6 caractères
  },
});

module.exports = mongoose.model('User', userSchema);