const express = require('express');
const router = express.Router();
const paramController = require('../controllers/paramController');

// Exemple pour MoveRobot
router.get('/ParametresMoveRobot/:id', paramController.getMoveRobotParam);

// Exemple pour PriseDeVue
router.get('/ParametresPrisedeVue/:id', paramController.getPriseDeVueParam);
router.get('/params/structure/:typeId', paramController.getParamStructure);
router.put('/Params/:sequenceId', paramController.updateSequenceParams);

module.exports = router;
