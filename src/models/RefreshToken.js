// src/models/refreshToken.js
module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    'RefreshToken',
    {
      id_token: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      id_usuario: { type: DataTypes.INTEGER, allowNull: false },
      token_hash: { type: DataTypes.TEXT, allowNull: false },
      issued_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      expires_at: { type: DataTypes.DATE, allowNull: false },
      revoked_at: { type: DataTypes.DATE },
      client_info: { type: DataTypes.JSONB },
    },
    {
      tableName: 'refresh_token',
      schema: 'mantenimiento_usuarios',
      timestamps: false,
    }
  );
  return RefreshToken;
};
