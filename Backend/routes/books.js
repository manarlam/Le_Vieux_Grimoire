const express = require ('express');
const router = express.Router();

const booksCtrl = require('../controllers/books')

/* CONFIGURATION DES ROUTES */

// Envoi d'un nouvel objet à l'API
router.post('/', booksCtrl.createBook);
// Modification de l'objet 
router.put('/:id', booksCtrl.modifyBook);
// Suppression d'un objet
router.delete ('/:id', booksCtrl.deleteBook);
// Recherche de l'ID de l'objet dans le front
router.get('/:id', booksCtrl.getOneBook);  
// Affichage des objets crées 
router.get('/', booksCtrl.getAllBook);
//


router.listen(4000, () => {
  console.log('Serveur lancé sur le port 4000')
})

module.exports = router;