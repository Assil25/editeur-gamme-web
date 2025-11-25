const express = require('express');
const router = express.Router();
const sequenceController = require('../controllers/sequenceController');

// Récupérer toutes les séquences
router.get('/', sequenceController.getAllSequences);
router.get('/typeSequences', sequenceController.getAllTypeSequences);
// Récupérer les séquences d'une opération
router.post('/', sequenceController.createSequence);
router.get('/operation/:id', sequenceController.getSequencesByOperationId);
// Récupérer tous les types de séquences



// Ajouter une séquence


// Modifier une séquence
router.put('/:id', sequenceController.updateSequence);

// Supprimer une séquence
router.delete('/:id', sequenceController.deleteSequence);

module.exports = router;
