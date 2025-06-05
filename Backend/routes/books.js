const express = require ('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const router = express.Router();


const booksCtrl = require('../controllers/books')

/* CONFIGURATION DES ROUTES */

// Affichage des objets crées 
router.get('/', booksCtrl.getAllBook);
// Recherche de l'ID de l'objet dans le front
router.get('/:id', booksCtrl.getOneBook);  
// Envoi d'un nouvel objet à l'API
router.post('/', auth, multer, booksCtrl.createBook);
// Modification de l'objet 
router.put('/:id', auth, multer, booksCtrl.modifyBook);
// Suppression d'un objet
router.delete ('/:id', auth, booksCtrl.deleteBook);
// Noter un livre
router.post('/:id/rating', auth, booksCtrl.rateBook);
// Meilleure note
router.get('/bestrating', booksCtrl.getBestRatedBooks);

module.exports = router;