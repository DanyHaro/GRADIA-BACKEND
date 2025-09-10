const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'gradia_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '191110',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  schema: 'cursos', // Esquema principal para cursos
  logging: console.log, // Para ver las consultas SQL
  timezone: '-05:00', // Lima timezone
});

// Función para probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida correctamente');
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error);
  }
};

module.exports = { sequelize, testConnection };