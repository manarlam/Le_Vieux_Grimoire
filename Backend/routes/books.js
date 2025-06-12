const express = require ('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')
const router = express.Router();


const booksCtrl = require('../controllers/books')

/* CONFIGURATION DES ROUTES */

// Meilleure note 
router.get('/bestrating', booksCtrl.getBestRating);

// Noter un livre 
router.post('/:id/rating', auth, booksCtrl.rateBook);

// Affichage de tous les livres
router.get('/', booksCtrl.getAllBooks);

// Récupération d’un livre par son ID
router.get('/:id', booksCtrl.getOneBook);

// Création d’un nouveau livre
router.post('/', auth, multer, booksCtrl.createBook);

// Modification
router.put('/:id', auth, multer, booksCtrl.modifyBook);

// Suppression
router.delete('/:id', auth, booksCtrl.deleteBook);


module.exports = router;