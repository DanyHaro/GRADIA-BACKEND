const { registerUser } = require('../services/userService');

const register = async (req, res) => {
  try {
    const { nombre, apellido, correo, password } = req.body;

    const user = await registerUser({ nombre, apellido, correo, password });

    res.status(201).json({
      message: 'Usuario estudiante registrado con éxito',
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register };
