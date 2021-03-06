const express = require('express');

const router = express.Router();

const surveyAdminController = require('../controllers/surveyAdmin.controller');

// Retrieve a single admin with id
router.get('/:id', surveyAdminController.findById);
router.post('/updateStatus', surveyAdminController.updateStatus);

module.exports = router;
