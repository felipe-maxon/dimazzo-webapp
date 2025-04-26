const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// Rota de cadastro
router.post('/register', register);

module.exports = router;