//Import du module express pour utiliser le router
const express = require('express');
const router = express.Router();

//Import du controllers

const userCtrl = require('../controllers/user');

//Définition des routes post

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//Export du fichier

module.exports = router;