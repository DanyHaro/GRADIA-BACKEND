const express = require('express');
const app = express();
const port = 8080;

// Middleware para parsear JSON
app.use(express.json());

// Opcional: parsear x-www-form-urlencoded (si envías form-data)
app.use(express.urlencoded({ extended: true }));

// Importamos las rutas correctas
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Rutas (registro, login, etc.)
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


// Ruta principal
app.get('/', (req, res) => {
  res.send('GRUPO GRADIA');
});


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
