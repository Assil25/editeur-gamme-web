const express = require('express');
const router = express.Router();
const operationController = require('../controllers/operationController');

// Récupérer toutes les opérations
router.get('/', operationController.getAllOperations);

// Récupérer les opérations d'une gamme
router.get('/gamme/:id', operationController.getOperationsByGammeId);

// Ajouter une opération
router.post('/', operationController.createOperation);

// Modifier une opération
router.put('/:id', operationController.updateOperation);

// Supprimer une opération
router.delete('/:id', operationController.deleteOperation);

module.exports = router;
