const { Unidad, Curso } = require('../models');

const unidadController = {
  // Crear una nueva unidad dentro de un curso
  async crearUnidad(req, res) {
    try {
      const { titulo_unidad, descripcion, numero_unidad, id_curso } = req.body;

      // Validaciones básicas
      if (!titulo_unidad || !numero_unidad || !id_curso) {
        return res.status(400).json({
          success: false,
          message: 'El título, número de unidad y ID del curso son requeridos'
        });
      }

      // Verificar que el curso existe
      const curso = await Curso.findByPk(id_curso);
      if (!curso) {
        return res.status(404).json({
          success: false,
          message: 'Curso no encontrado'
        });
      }

      // Verificar que no exista ya una unidad con ese número en el curso
      const unidadExistente = await Unidad.findOne({
        where: { id_curso, numero_unidad }
      });

      if (unidadExistente) {
        return res.status(400).json({
          success: false,
          message: `Ya existe una unidad con el número ${numero_unidad} en este curso`
        });
      }

      const nuevaUnidad = await Unidad.create({
        titulo_unidad,
        descripcion,
        numero_unidad,
        id_curso
      });

      res.status(201).json({
        success: true,
        message: 'Unidad creada exitosamente',
        data: nuevaUnidad
      });

    } catch (error) {
      console.error('Error al crear unidad:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Listar unidades de un curso específico
  async listarUnidadesPorCurso(req, res) {
    try {
      const { cursoId } = req.params;

      // Verificar que el curso existe
      const curso = await Curso.findByPk(cursoId);
      if (!curso) {
        return res.status(404).json({
          success: false,
          message: 'Curso no encontrado'
        });
      }

      const unidades = await Unidad.findAll({
        where: { id_curso: cursoId },
        include: [{
          model: Curso,
          as: 'curso',
          attributes: ['id_curso', 'nombre_curso']
        }],
        order: [['numero_unidad', 'ASC']]
      });

      res.status(200).json({
        success: true,
        message: 'Unidades obtenidas exitosamente',
        data: unidades,
        total: unidades.length,
        curso: {
          id: curso.id_curso,
          nombre: curso.nombre_curso
        }
      });

    } catch (error) {
      console.error('Error al listar unidades:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Obtener unidad por ID
  async obtenerUnidadPorId(req, res) {
    try {
      const { id } = req.params;

      const unidad = await Unidad.findByPk(id, {
        include: [{
          model: Curso,
          as: 'curso',
          attributes: ['id_curso', 'nombre_curso', 'descripcion']
        }]
      });

      if (!unidad) {
        return res.status(404).json({
          success: false,
          message: 'Unidad no encontrada'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Unidad obtenida exitosamente',
        data: unidad
      });

    } catch (error) {
      console.error('Error al obtener unidad:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Actualizar unidad
  async actualizarUnidad(req, res) {
    try {
      const { id } = req.params;
      const { titulo_unidad, descripcion, numero_unidad } = req.body;

      const unidad = await Unidad.findByPk(id);

      if (!unidad) {
        return res.status(404).json({
          success: false,
          message: 'Unidad no encontrada'
        });
      }

      // Si se está cambiando el número de unidad, verificar que no exista otro con ese número
      if (numero_unidad && numero_unidad !== unidad.numero_unidad) {
        const unidadExistente = await Unidad.findOne({
          where: { 
            id_curso: unidad.id_curso, 
            numero_unidad,
            id_unidad: { [require('sequelize').Op.ne]: id } // Excluir la unidad actual
          }
        });

        if (unidadExistente) {
          return res.status(400).json({
            success: false,
            message: `Ya existe una unidad con el número ${numero_unidad} en este curso`
          });
        }
      }

      await unidad.update({
        titulo_unidad: titulo_unidad || unidad.titulo_unidad,
        descripcion: descripcion || unidad.descripcion,
        numero_unidad: numero_unidad || unidad.numero_unidad,
        updated_at: new Date()
      });

      res.status(200).json({
        success: true,
        message: 'Unidad actualizada exitosamente',
        data: unidad
      });

    } catch (error) {
      console.error('Error al actualizar unidad:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Eliminar unidad
  async eliminarUnidad(req, res) {
    try {
      const { id } = req.params;

      const unidad = await Unidad.findByPk(id);

      if (!unidad) {
        return res.status(404).json({
          success: false,
          message: 'Unidad no encontrada'
        });
      }

      await unidad.destroy();

      res.status(200).json({
        success: true,
        message: 'Unidad eliminada exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar unidad:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  },

  // Listar todas las unidades (opcional)
  async listarTodasUnidades(req, res) {
    try {
      const unidades = await Unidad.findAll({
        include: [{
          model: Curso,
          as: 'curso',
          attributes: ['id_curso', 'nombre_curso']
        }],
        order: [['id_curso', 'ASC'], ['numero_unidad', 'ASC']]
      });

      res.status(200).json({
        success: true,
        message: 'Todas las unidades obtenidas exitosamente',
        data: unidades,
        total: unidades.length
      });

    } catch (error) {
      console.error('Error al listar todas las unidades:', error);
      res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: error.message
      });
    }
  }
};

module.exports = unidadController;