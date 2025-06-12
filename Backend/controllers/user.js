const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Création de compte
exports.signup = (req, res, next) => {
    // Hachage du mot de passe 10 fois
    bcrypt.hash(req.body.password, 10)
    // Création d'un utilisateur en utilisant le hash
        .then(hash => {
            const user = new User ({
                email: req.body.email,
                password: hash
            });
            // Enregistrement dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};

// Connexion de l'utilisateur 
exports.login = (req, res, next) => {
    // Vérification de l'existence de l'utilisateur
   User.findOne({ email: req.body.email })
       .then(user => {
           if (!user) {
               return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
           }
           // Comparaison du mot de passe entré avec le hash
           bcrypt.compare(req.body.password, user.password)
               .then(valid => {
                   if (!valid) {
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                   // Renvoi d'une réponse valide contenant le userId et un token crypté
                   res.status(200).json({
                       userId: user._id,
                       token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                       )
                   });
               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => res.status(500).json({ error }));
};

