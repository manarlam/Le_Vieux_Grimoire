const jwt = require('jsonwebtoken');
 
// Middlware d'authentification
module.exports = (req, res, next) => {
   try {
        // Extraction du token
        const token = req.headers.authorization.split(' ')[1];
        // Décodage du token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Extraction de l'ID authentifié
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error) {
       res.status(401).json({ error });
   }
};