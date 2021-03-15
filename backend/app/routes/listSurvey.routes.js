const express = require('express');

const router = express.Router();

const listSurveyController = require('../controllers/listSurvey.controller');

// Retrieve a single admin with id
router.post('/create', listSurveyController.create);
router.get('/findAll', listSurveyController.findAll);
router.get('/count', listSurveyController.count);

module.exports = router;
