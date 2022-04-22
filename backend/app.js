
//Import du package dotenv
require('dotenv').config();
//Import du module express
const express = require('express');
const app = express();
//Import de mongoose
const mongoose = require('mongoose');
//Import du module body-parser
const bodyParser = require('body-parser');

const path = require('path');

//Import des routes des sauces


const sauceRoutes = require ('../backend/routes/sauces');
const userRoutes = require ('../backend/routes/user');

//Import du middleware qui permet d'accéder à l'API avec les méthodes pour envoyer les requêtes

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Middleware pour gérer les posts venant du front end

app.use(bodyParser.json());


app.use('/images', express.static(path.join(__dirname, 'images')));

//Connexion de l'API avec la base de données

mongoose.connect( process.env.MONGOLAB_URI ,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB totalement réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Définition du chemin des routes

app.use('/api/sauces',sauceRoutes);
app.use('/api/auth', userRoutes);

//Export du fichier

module.exports = app;



