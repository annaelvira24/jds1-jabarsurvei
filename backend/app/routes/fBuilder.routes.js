const express = require('express');

const router = express.Router();

const fBuilderController = require('../controllers/fBuilder.controller');

router.post('/createform', fBuilderController.create);
router.get('/findById/:id', fBuilderController.findById);
router.get('/getTitleById/:id', fBuilderController.getTitleById);

module.exports = router;