const { Curso, Unidad } = require('../models');

const cursoController = {
  // Crear un nuevo curso
  async crearCurso(req, res) {
    try {
      const { nombre_curso, descripcion, id_usuario } = req.body;

      // Validaciones básicas
      if (!nombre_curso || !id_usuario) {
        return res.status(400).json({
          success: false,
          message: 'El nombre del curso y el ID del usuario son requeridos'
        });
      }

      const nuevoCurso = await Curso.create({
        nombre_curso,
        descripcion,
        id_usuario,
        estado: 'activo'
      });

      res.status(201).json({
        success: true,
        message: 'Curso creado exitosamente',
        data: nuevoCurso
      });

    } catch (error) {
      console.error('Error al crear curso:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Listar todos los cursos
  async listarCursos(req, res) {
    try {
      const cursos = await Curso.findAll({
        include: [{
          model: Unidad,
          as: 'unidades',
          attributes: ['id_unidad', 'titulo_unidad', 'numero_unidad']
        }],
        order: [['created_at', 'DESC']]
      });

      res.status(200).json({
        success: true,
        message: 'Cursos obtenidos exitosamente',
        data: cursos,
        total: cursos.length
      });

    } catch (error) {
      console.error('Error al listar cursos:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Obtener curso por ID con sus unidades
  async obtenerCursoPorId(req, res) {
    try {
      const { id } = req.params;

      const curso = await Curso.findByPk(id, {
        include: [{
          model: Unidad,
          as: 'unidades',
          order: [['numero_unidad', 'ASC']]
        }]
      });

      if (!curso) {
        return res.status(404).json({
          success: false,
          message: 'Curso no encontrado'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Curso obtenido exitosamente',
        data: curso
      });

    } catch (error) {
      console.error('Error al obtener curso:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Actualizar curso
  async actualizarCurso(req, res) {
    try {
      const { id } = req.params;
      const { nombre_curso, descripcion, estado } = req.body;

      const curso = await Curso.findByPk(id);

      if (!curso) {
        return res.status(404).json({
          success: false,
          message: 'Curso no encontrado'
        });
      }

      await curso.update({
        nombre_curso: nombre_curso || curso.nombre_curso,
        descripcion: descripcion || curso.descripcion,
        estado: estado || curso.estado,
        updated_at: new Date()
      });

      res.status(200).json({
        success: true,
        message: 'Curso actualizado exitosamente',
        data: curso
      });

    } catch (error) {
      console.error('Error al actualizar curso:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Eliminar curso
  async eliminarCurso(req, res) {
    try {
      const { id } = req.params;

      const curso = await Curso.findByPk(id);

      if (!curso) {
        return res.status(404).json({
          success: false,
          message: 'Curso no encontrado'
        });
      }

      // Verificar si tiene unidades asociadas
      const unidades = await Unidad.findAll({ where: { id_curso: id } });
      
      if (unidades.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'No se puede eliminar el curso porque tiene unidades asociadas'
        });
      }

      await curso.destroy();

      res.status(200).json({
        success: true,
        message: 'Curso eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar curso:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
};

module.exports = cursoController;