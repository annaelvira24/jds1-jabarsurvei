const express = require('express');

const router = express.Router();

const surveyFillController = require('../controllers/surveyFill.controller');

router.get('/getDescription/:id', surveyFillController.getDescription);
router.get('/findById/:id', surveyFillController.findById);

module.exports = router;