const express = require('express');
const router = express.Router();
const { register } = require('../controllers/userController');

// POST /api/users/register → crear usuario estudiante
router.post('/register', register);

module.exports = router;
