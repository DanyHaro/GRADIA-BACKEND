// src/models/usuarioRol.js
module.exports = (sequelize, DataTypes) => {
  const UsuarioRol = sequelize.define(
    'UsuarioRol',
    {
      id_usuario_rol: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      id_usuario: { type: DataTypes.INTEGER, allowNull: false },
      id_rol: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: 'usuario_rol',
      schema: 'mantenimiento_usuarios',
      timestamps: false,
    }
  );
  return UsuarioRol;
};
