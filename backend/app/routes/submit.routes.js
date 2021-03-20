const express = require('express');

const router = express.Router();

const AnswerController = require('../controllers/submit.controller');

router.get('/getLastIdAnswer', AnswerController.getLastIdAnswer);
module.exports = router;