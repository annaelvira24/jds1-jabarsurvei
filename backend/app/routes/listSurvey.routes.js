const express = require('express');

const router = express.Router();

const listSurveyController = require('../controllers/listSurvey.controller');

// Retrieve a single admin with id
router.get('/findAll', listSurveyController.findAll);
router.get('/id/:id', listSurveyController.findById);
router.get('/link/:link', listSurveyController.findByLink);
router.get('/count', listSurveyController.count);

module.exports = router;
