const express = require('express');

const router = express.Router();

const AnswerController = require('../controllers/submit.controller');

router.get('/getLastIdAnswer', AnswerController.getLastIdAnswer);
router.post('/submitAnswer', AnswerController.submitAnswer);
router.get('/count', AnswerController.count);
module.exports = router;