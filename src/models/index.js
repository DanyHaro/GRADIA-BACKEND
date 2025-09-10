const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

// Importar modelos
const Persona = require('./Persona')(sequelize,DataTypes);
const Usuario = require('./Usuario')(sequelize, DataTypes);
const Rol = require('./Rol')(sequelize, DataTypes);
const Permiso = require('./Permiso')(sequelize, DataTypes);
const UsuarioRol = require('./UsuarioRol')(sequelize, DataTypes);
const RolPermiso = require('./RolPermiso')(sequelize, DataTypes);
const RefreshToken = require('./RefreshToken')(sequelize, DataTypes);

// Relaciones
Usuario.belongsTo(Persona, { foreignKey: 'id_persona' });
Persona.hasOne(Usuario, { foreignKey: 'id_persona' });

Usuario.belongsToMany(Rol, { through: UsuarioRol, foreignKey: 'id_usuario' });
Rol.belongsToMany(Usuario, { through: UsuarioRol, foreignKey: 'id_rol' });

Rol.belongsToMany(Permiso, { through: RolPermiso, foreignKey: 'id_rol' });
Permiso.belongsToMany(Rol, { through: RolPermiso, foreignKey: 'id_permiso' });

RefreshToken.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Usuario.hasMany(RefreshToken, { foreignKey: 'id_usuario' });

module.exports = {
  sequelize,
  Persona,
  Usuario,
  Rol,
  Permiso,
  UsuarioRol,
  RolPermiso,
  RefreshToken,
};
