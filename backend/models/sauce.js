//import du module
//Import du package mongoose

const mongoose = require('mongoose');

//Définition du modèle sauce
const sauceSchema = mongoose.Schema({
    
    id: { type: String, require: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: ["String <userId>"], required: true },
    usersDisliked: { type: ["String <userId>"], required: true },
});

//Export du modèle

module.exports = mongoose.model('Sauce', sauceSchema); 

