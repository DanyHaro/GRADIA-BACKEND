// src/models/persona.js
module.exports = (sequelize, DataTypes) => {
  const Persona = sequelize.define(
    'Persona',
    {
      id_persona: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      nombre: { type: DataTypes.STRING(100), allowNull: false },
      apellido: { type: DataTypes.STRING(100), allowNull: false },
      fecha_nacimiento: { type: DataTypes.DATE },
    },
    {
      tableName: 'persona',
      schema: 'mantenimiento_usuarios',
      timestamps: false,
    }
  );
  return Persona;
};
