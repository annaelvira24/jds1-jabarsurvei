const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin.controller');

// Retrieve a single admin with id
router.get('/:id', adminController.findById);
router.post('/login', adminController.login);
router.post('/register', adminController.create);


module.exports = router;