// src/models/rol.js
module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define(
    'Rol',
    {
      id_rol: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre_rol: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      descripcion_rol: { type: DataTypes.TEXT },
      estado: { type: DataTypes.STRING(20), defaultValue: 'activo' },
    },
    {
      tableName: 'rol',
      schema: 'mantenimiento_usuarios',
      timestamps: false,
    }
  );
  return Rol;
};
