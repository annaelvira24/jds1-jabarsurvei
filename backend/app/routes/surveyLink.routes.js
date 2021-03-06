const express = require('express');

const router = express.Router();

const surveyLinkController = require('../controllers/surveyLink.controller');


router.get('/:id', surveyLinkController.findLinkById);
router.post('/createLink', surveyLinkController.createLink);

module.exports = router;