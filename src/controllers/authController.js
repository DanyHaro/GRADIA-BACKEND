const { Usuario } = require('../models');
const AuthService = require('../services/authService');

class AuthController {

  static async login(req, res) {
    try {
      const { correo, password } = req.body;
      if (!correo || !password) return res.status(400).json({ message: 'Faltan datos' });

      const user = await Usuario.findOne({ 
        where: { correo_institucional: correo, estado: 'activo' }
      });
      if (!user) return res.status(400).json({ message: 'Usuario no encontrado o inactivo' });

      const isValid = await AuthService.comparePassword(password, user.password_hash);
      if (!isValid) return res.status(400).json({ message: 'Contraseña incorrecta' });

      const clientInfo = { ip: req.ip, userAgent: req.headers['user-agent'] };
      const tokens = await AuthService.generateTokens(user, clientInfo);

      res.json(tokens);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async refresh(req, res) {
    try {
      const { id_usuario, refreshToken } = req.body;
      if (!refreshToken) return res.status(401).json({ message: 'No se proporcionó refresh token' });

      await AuthService.verifyRefreshToken(id_usuario, refreshToken);

      const user = await Usuario.findByPk(id_usuario);
      if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

      const clientInfo = { ip: req.ip, userAgent: req.headers['user-agent'] };
      const tokens = await AuthService.generateTokens(user, clientInfo);

      res.json(tokens);
    } catch (err) {
      res.status(403).json({ message: err.message });
    }
  }

  static async logout(req, res) {
    try {
      const { id_usuario, refreshToken } = req.body;
      if (!refreshToken) return res.status(400).json({ message: 'No se proporcionó refresh token' });

      await AuthService.revokeRefreshToken(id_usuario, refreshToken);
      res.json({ message: 'Logout exitoso' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = AuthController;
