const express = require('express');
const mongoose = require('mongoose');

const Book = require('./models/book');
const user = require('./models/user');

const app = express();
mongoose.connect('mongodb+srv://manlam:N5z5hKwjPGUcN4-@cluster0.9zj4nog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use (express.json()); // Intercèpte les requêtes qui contiennent du json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.post('/api/books', (req, res, next) => {
  delete req.body._id;
  const book = new Book ({
    ...req.body   
  });
  book.save()
    .then(() => res.status(201).json({message: 'Objet enregistré!'}))
    .catch(error => res.status(400).json({ error: error}));
});

// app.get('/api/books', (req, res, next) => {
//   const books = [  // Exemple temporaire de données à renvoyer
//     { id: 1, averageRating: 3, title: 'Milwaukee Mission', author: 'Elder Cooper', year: 2021, genre:'Policier' },
//     { id: 2, averageRating: 4, title: 'Book for Esther', author: 'Alabaster', year: 2022, genre:'Paysage' }
//   ];
//   res.status(200).json(books);
// });

app.get('/api/books/:id', (req, res, next) => {  //chercher l'ID de l'objet dans le front
  Book.findOne({ _id: req.params.id })
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
});  

app.get('/api/books', (req, res, next) => { // Affichage des objets crées 
  Book.find ()
  .then(books => res.status(200).json(books))
  .catch(error => res.status(400).json({error}))
});



app.listen(4000, () => {
  console.log('Serveur lancé sur le port 4000')
})

module.exports = app;
