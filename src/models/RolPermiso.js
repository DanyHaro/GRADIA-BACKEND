// src/models/rolPermiso.js
module.exports = (sequelize, DataTypes) => {
  const RolPermiso = sequelize.define(
    'RolPermiso',
    {
      id_rol: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
      id_permiso: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    },
    {
      tableName: 'rol_permiso',
      schema: 'mantenimiento_usuarios',
      timestamps: false,
    }
  );
  return RolPermiso;
};
