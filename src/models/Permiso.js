// src/models/permiso.js
module.exports = (sequelize, DataTypes) => {
  const Permiso = sequelize.define(
    'Permiso',
    {
      id_permiso: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre_permiso: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      descripcion_permiso: { type: DataTypes.TEXT },
    },
    {
      tableName: 'permiso',
      schema: 'mantenimiento_usuarios',
      timestamps: false,
    }
  );
  return Permiso;
};
