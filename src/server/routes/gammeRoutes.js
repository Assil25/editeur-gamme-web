const express = require('express');
const router = express.Router();
const gammeController = require('../controllers/gammeController');

// Récupérer toutes les gammes
router.get('/', gammeController.getAllGammes);

// Récupérer une gamme par ID
router.get('/:id', gammeController.getGammeById);

// Ajouter une nouvelle gamme
router.post('/', gammeController.createGamme);

// Modifier une gamme
router.put('/:id', gammeController.updateGamme);

// Supprimer une gamme
router.delete('/:id', gammeController.deleteGamme);

module.exports = router;
