const express = require('express');
const mongoose = require('mongoose');

const booksRoutes = require('./routes/books')
const userRoutes = require('./routes/user');

const app = express();

// Connexion à MongoDB
mongoose.connect('mongodb+srv://manlam:N5z5hKwjPGUcN4-@cluster0.9zj4nog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//

// Intercèpte les requêtes qui contiennent du json
app.use (express.json()); 
//

// CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//

app.use(bodyParser.json());

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
