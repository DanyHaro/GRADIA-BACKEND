const { Usuario, RefreshToken, Rol, UsuarioRol } = require('../models');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { signAccessToken, verifyAccessToken } = require('../utils/jwt');
const { generateRefreshToken } = require('../utils/refreshToken');

class AuthService {

  // 1️⃣ Hashear contraseña
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // 2️⃣ Comparar contraseña
  static async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  // 3️⃣ Generar tokens y guardar refresh token en DB
  static async generateTokens(user, clientInfo = {}) {
    // 3a. Traer roles del usuario
    const roles = await user.getRols({ attributes: ['nombre_rol'] });
    const rolesArray = roles.map(r => r.nombre_rol);

    // 3b. Generar Access Token
    const accessToken = signAccessToken({
      id_usuario: user.id_usuario,
      correo: user.correo_institucional,
      roles: rolesArray
    });

    // 3c. Generar Refresh Token
    const { tokenPlain, tokenHash } = generateRefreshToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

    // 3d. Guardar hash del refresh token
    await RefreshToken.create({
      id_usuario: user.id_usuario,
      token_hash: tokenHash,
      expires_at: expiresAt,
      client_info: clientInfo
    });

    return { accessToken, refreshToken: tokenPlain };
  }

  // 4️⃣ Verificar refresh token
  static async verifyRefreshToken(userId, token) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const refresh = await RefreshToken.findOne({
      where: {
        id_usuario: userId,
        token_hash: tokenHash,
        revoked_at: null,
        expires_at: { [require('sequelize').Op.gt]: new Date() }
      }
    });

    if (!refresh) throw new Error('Refresh token inválido o expirado');
    return true;
  }

  // 5️⃣ Revocar refresh token
  static async revokeRefreshToken(userId, token) {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    await RefreshToken.update(
      { revoked_at: new Date() },
      { where: { id_usuario: userId, token_hash: tokenHash } }
    );
  }

}

module.exports = AuthService;
