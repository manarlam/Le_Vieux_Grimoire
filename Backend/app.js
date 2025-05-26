const express = require('express');
const mongoose = require('mongoose');

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


app.get('/api/books', (req, res, next) => {
  const books = [  // Exemple temporaire de données à renvoyer
    { id: 1, averageRating: 3, title: 'Milwaukee Mission', author: 'Elder Cooper', year: 2021, genre:'Policier' },
    { id: 2, averageRating: 4, title: 'Book for Esther', author: 'Alabaster', year: 2022, genre:'Paysage' }
  ];
  res.status(200).json(books);
});

app.listen(4000, () => {
  console.log('Serveur lancé sur le port 4000')
})

module.exports = app;
