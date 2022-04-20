//Import des modules express et router

const express = require ('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');

const auth = require ('../middleware/auth');

const multer = require ('../middleware/multer-config');

//Routes pour appeler les controllers sauces

router.post('/', auth, multer, saucesCtrl.createSauces);
router.post('/:id/like', auth, saucesCtrl.likeSauces);
router.put('/:id', auth, multer, saucesCtrl.modifySauces)
router.delete('/:id/', auth, saucesCtrl.deleteSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauces);

module.exports = router;//Export du fichier

