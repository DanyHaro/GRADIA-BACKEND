const bcrypt = require('bcrypt');
const { Persona, Usuario, Rol, UsuarioRol } = require('../models');

const registerUser = async ({ nombre, apellido, correo, password }) => {
  
  // 1. Validar que no exista el correo
  const existingUser = await Usuario.findOne({ where: { correo_institucional: correo } });
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  // 2. Hashear contraseña
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // 3. Crear persona
  const persona = await Persona.create({
    nombre,
    apellido,
    fecha_nacimiento: null, // opcional si aún no lo manejas
  });

  // 4. Crear usuario
  const usuario = await Usuario.create({
    correo_institucional: correo,
    password_hash: passwordHash,
    id_persona: persona.id_persona,
  });

  // 5. Buscar rol estudiante
  const rolEstudiante = await Rol.findOne({ where: { nombre_rol: 'estudiante' } });
  if (!rolEstudiante) {
    throw new Error('No existe el rol estudiante en la BD');
  }

  // 6. Asignar rol al usuario
  await UsuarioRol.create({
    id_usuario: usuario.id_usuario,
    id_rol: rolEstudiante.id_rol,
  });

  // 7. Retornar usuario (sin password)
  return {
    id: usuario.id_usuario,
    correo: usuario.correo_institucional,
    rol: rolEstudiante.nombre_rol,
  };
};

module.exports = {
  registerUser,
};
