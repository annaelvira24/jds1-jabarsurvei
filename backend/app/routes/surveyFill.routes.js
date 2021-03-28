const express = require('express');

const router = express.Router();

const surveyFillController = require('../controllers/surveyFill.controller');

router.get('/getSurvey/:id', surveyFillController.getSurvey);
router.get('/getResult/:id', surveyFillController.getResult);

module.exports = router;