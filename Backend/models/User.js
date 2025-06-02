const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')

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
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);