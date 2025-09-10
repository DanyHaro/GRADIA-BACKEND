// src/models/usuario.js
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    'Usuario',
    {
      id_usuario: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      correo_institucional: { type: DataTypes.STRING(150), allowNull: false, unique: true },
      password_hash: { type: DataTypes.STRING(255), allowNull: false },
      estado: { type: DataTypes.STRING(20), defaultValue: 'activo' },
      id_persona: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: 'usuario',
      schema: 'mantenimiento_usuarios',
      timestamps: false,
    }
  );
  return Usuario;
};
