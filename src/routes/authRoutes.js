const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authenticate = require('../middlewares/authentication');
const authorize = require('../middlewares/authorization');

router.post('/login', AuthController.login);
router.post('/token', AuthController.refresh);
router.post('/logout', AuthController.logout);

// Ejemplo de ruta protegida con roles
router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.json({ message: 'Ruta admin OK', user: req.user });
});

module.exports = router;
