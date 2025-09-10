const express = require('express');
const router = express.Router();
const unidadController = require('../controllers/unidadController');

// Rutas para unidades
// POST /api/unidades - Crear una nueva unidad
router.post('/', unidadController.crearUnidad);

// GET /api/unidades - Listar todas las unidades
router.get('/', unidadController.listarTodasUnidades);

// GET /api/unidades/curso/:cursoId - Listar unidades de un curso específico
router.get('/curso/:cursoId', unidadController.listarUnidadesPorCurso);

// GET /api/unidades/:id - Obtener unidad por ID
router.get('/:id', unidadController.obtenerUnidadPorId);

// PUT /api/unidades/:id - Actualizar unidad
router.put('/:id', unidadController.actualizarUnidad);

// DELETE /api/unidades/:id - Eliminar unidad
router.delete('/:id', unidadController.eliminarUnidad);

module.exports = router;