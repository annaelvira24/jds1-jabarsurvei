const express = require('express');

const router = express.Router();

const surveyResController = require('../controllers/SurveyRes.controller');

router.get('/getResult/:link', surveyResController.getResult);

module.exports = router;