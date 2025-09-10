const express = require('express');
const router = express.Router();

// Importar rutas específicas
const cursoRoutes = require('./cursoRoutes');
const unidadRoutes = require('./unidadRoutes');

// Configurar rutas
router.use('/cursos', cursoRoutes);
router.use('/unidades', unidadRoutes);

// Ruta de prueba
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de GRADIA funcionando correctamente',
    endpoints: {
      cursos: '/api/cursos',
      unidades: '/api/unidades'
    }
  });
});

// Ruta para health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Servidor funcionando',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;