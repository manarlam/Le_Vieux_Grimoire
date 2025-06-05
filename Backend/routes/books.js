const express = require ('express');
const auth = require('../middleware/auth');
const router = express.Router();


const booksCtrl = require('../controllers/books')

/* CONFIGURATION DES ROUTES */

// Envoi d'un nouvel objet à l'API
router.post('/', auth, booksCtrl.createBook);
// Modification de l'objet 
router.put('/:id', auth, booksCtrl.modifyBook);
// Suppression d'un objet
router.delete ('/:id', auth, booksCtrl.deleteBook);
// Recherche de l'ID de l'objet dans le front
router.get('/:id', auth, booksCtrl.getOneBook);  
// Affichage des objets crées 
router.get('/', auth, booksCtrl.getAllBook);
//

module.exports = router;