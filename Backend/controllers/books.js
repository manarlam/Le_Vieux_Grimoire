const Book = require('../models/Book');
const fs = require('fs');


//  Enregistrement d'un livre
exports.createBook = (req, res, next) => {
    // Stockage de la requête sous forme de Json
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete  bookObject._userId;
    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

// Enregistrement dans la base de données
  book.save()
    .then(() => res.status(201).json({
      message: 'Objet enregistré!'}))
    .catch(error => res.status(400).json({ error: error}));
}

// Modification d'un livre
exports.modifyBook = (req, res, next) => {    
  //Stockage de la requête en JSON
  const bookObject = req.file ? {
    ...JSON.parse(req.body.book),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  delete bookObject._userId;
  // Récupération d'un livre existant pour le modifier
  Book.findOne({_id: req.params.id})
    .then((book) => {
      // Seul le créateur du livre peut le modifier
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: 'Non-autorisé'})
      } else { 
          // Split du nom de fichier existant
          const filename = book.imageUrl.split('/images/')[1];
          // Suppression de l'ancienne image après une modification 
          req.file && fs.unlink(`images/${filename}`, (err => {
              if (err) console.log(err);
            })
          );
            // Mise à jour du livre 
            Book.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet modifié!'}))
                .catch(error => res.status(401).json({error}));
              }
            })
            .catch((error) => {
                res.status(404).json({ error });
          });
};

// Suppression d'un livre
exports.deleteBook = (req, res, next) => {
  Book.findOne({_id: req.params.id})
    .then(book => {
      // Le livre ne peut être supprimé que par le même utilisateur
      if (book.userId != req.auth.userId) {
        res.status(403).json({message: 'Non-autorisé'});
      } else {
        // Séparation du nom et de l'image
        const filename = book.imageUrl.split('/images/')[1];
        // Suppression de l'image et du livre dans la base de données
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: 'Objet supprimé !'}); })
            .catch(error => res.status(401).json({ error }));
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
}

// Création d'une note
exports.rateBook = (req, res, next) => {
  if (0 <= req.body.rating <= 5) {
    const ratingBook = { ...req.body, grade: req.body.rating };
    delete ratingBook._id;
    // Récupération du livre pour ajouter une note
    Book.findOne({_id: req.params.id})
      .then(book => {
        // Tableau des userId ayant déjà noté le livre
        const newRatings = book.ratings;
        const userIdArray = newRatings.map(rating => rating.userId);
          // Vérification de l'userId ayant noté le livre ou non
          if (userIdArray.includes(req.auth.userId)) {
            res.status(403).json({ message: 'Non autorisé'})
          } else {
            // Ajout de la note
            newRatings.push(ratingBook);
              // Tableau regroupant les notes et calcul de la moyenne
              const grades = newRatings.map(rating => rating.grade);
              const averageGrades = average.average(grades);
              book.averageRating = averageGrades;
                // Mise à jour de la note
                Book.updateOne({ _id: req.params.id }), { ratings: newRatings, averageRating: averageGrades, _id: req.params.id }
                  .then(() => { res.status(201).json()})
                  .catch(error => { res.status(400).json( { error })});
                  res.status(200).json(book);
                }
              })
            .catch((error) => {
            res.status(404).json({ error });
          });
        } else {
          res.status(400).json({ message: 'La note doit être comprise entre 1 et 5' });
      }
};

// Récupération d'un livre 
exports.getOneBook = (req, res, next) => {  
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
}

// Récupération de tous les livres
exports.getAllBooks = (req, res, next) => { 
  Book.find ()
  .then(books => res.status(200).json(books))
  .catch(error => res.status(400).json({error}))
}

// Récupération des meilleurs livres et tri par rapport à la moyenne dans l'ordre décroissant
exports.getBestRating = async (req, res, next) => {
  try {
    const bestRatedBooks = await Book.find()
      .sort({ averageRating: -1 })
      .limit(3)
    res.status(200).json(bestRatedBooks)
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est produite' })
  }
}