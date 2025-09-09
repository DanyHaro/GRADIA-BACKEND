
const express = require('express');
const app = express();

const port = 3000;

// Ruta principal
app.get('/', (req, res) => {
  res.send('GRUPO GRADIA');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});