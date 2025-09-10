const Curso = require('./curso');
const Unidad = require('./unidad');

// Definir asociaciones
Curso.hasMany(Unidad, {
  foreignKey: 'id_curso',
  as: 'unidades'
});

Unidad.belongsTo(Curso, {
  foreignKey: 'id_curso',
  as: 'curso'
});

module.exports = {
  Curso,
  Unidad
};