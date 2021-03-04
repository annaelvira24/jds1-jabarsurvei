const express = require('express');

const router = express.Router();

const fBuilderController = require('../controllers/fBuilder.controller');

router.post('/createform', fBuilderController.createForm);

module.exports = router;