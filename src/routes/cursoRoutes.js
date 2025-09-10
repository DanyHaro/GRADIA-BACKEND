const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');

// Rutas para cursos
// POST /api/cursos - Crear un nuevo curso
router.post('/', cursoController.crearCurso);

// GET /api/cursos - Listar todos los cursos
router.get('/', cursoController.listarCursos);

// GET /api/cursos/:id - Obtener curso por ID con sus unidades
router.get('/:id', cursoController.obtenerCursoPorId);

// PUT /api/cursos/:id - Actualizar curso
router.put('/:id', cursoController.actualizarCurso);

// DELETE /api/cursos/:id - Eliminar curso
router.delete('/:id', cursoController.eliminarCurso);

module.exports = router;