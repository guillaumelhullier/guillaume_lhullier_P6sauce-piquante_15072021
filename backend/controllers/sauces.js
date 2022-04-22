//import des modules

const Sauce = require('../models/sauce');

//Import de module pour interagir avec le système de fichier

const fs = require('fs');


// Controllers pour créer une sauce
exports.createSauces = (req, res, next) => {
  // récupère et transforme chaine en objet js
  const sauceObject = JSON.parse(req.body.sauce);
  // Efface L'id prédéfini pour en créer une nouvelle
    delete sauceObject._id;
    const sauce = new Sauce ({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes: 0,
      dislikes: 0,
      usersDisliked: [],
      usersLiked: []
    });
  // sauvegarde la nouvelle sauce dans la bas de données
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error }));
}; 

// Controllers pour modifier une sauce
exports.modifySauces = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
  // Met a jour la base de données avec les nouveaux éléments 
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }));
};

// Controllers por effacer une sauce grâce a l'ID
exports.deleteSauces = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
        .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
    
};

// Controllers pour afficher une sauce grâce a l'ID
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// Controllers pour afficher toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(400).json({ error }));
}


//**
// * LIKE / DISLIKE
// */
exports.likeSauces = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;
    console.log(req)
    Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            console.log(sauce)
                // new values
            const newValues = {
                usersLiked: sauce.usersLiked,
                usersDisliked: sauce.usersDisliked,
                likes: 0,
                dislikes: 0
            }


            // Switch case:
            switch (like) {
                case 1: // case: sauce's liked
                    newValues.usersLiked.push(userId);
                    break;
                case -1: // case: sauce's disliked
                    newValues.usersDisliked.push(userId);
                    break;
                case 0: // case: canceling like/dislike
                    if (newValues.usersLiked.includes(userId)) {
                        // if like's canceled
                        const index = newValues.usersLiked.indexOf(userId);
                        newValues.usersLiked.splice(index, 1);
                    } else {
                        // if dislike's canceled
                        const index = newValues.usersDisliked.indexOf(userId);
                        newValues.usersDisliked.splice(index, 1);
                    }
                    break;
            };
            // Calculating likes / dislikes
            newValues.likes = newValues.usersLiked.length;
            newValues.dislikes = newValues.usersDisliked.length;
            // updating sauce new values
            Sauce.updateOne({ _id: sauceId }, newValues)
                .then(() => res.status(200).json({ message: 'Sauce notée !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}













       