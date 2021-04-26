const express = require('express');

const router = express.Router();

const surveyResController = require('../controllers/surveyRes.controller');

router.get('/getResult/:link', surveyResController.getResult);
router.get('/getAnswerByLink/:link', surveyResController.getAnswerByLink);
router.get('/getAnswerByLinkAlter/:link', surveyResController.getAnswerByLinkAlter);
router.get('/getQuestionCount/:link', surveyResController.getQuestionCount);
router.get('/getQuestionByLink/:link', surveyResController.getQuestionCount);


module.exports = router;