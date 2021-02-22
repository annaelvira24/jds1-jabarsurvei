const express = require('express');

const router = express.Router();

const listSurveyController = require('../controllers/listSurvey.controller');

// Retrieve a single admin with id
router.get('/findAll', listSurveyController.findAll);

module.exports = router;