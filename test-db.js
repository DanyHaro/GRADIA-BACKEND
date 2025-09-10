require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'gradia_db',
  password: process.env.DB_PASSWORD || '191110',
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  console.log('Probando conexión a PostgreSQL...');
  console.log('Configuración:', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'gradia_db',
    user: process.env.DB_USER || 'postgres'
  });

  try {
    const client = await pool.connect();
    console.log('Conexión exitosa a PostgreSQL');
    
    // Probar una consulta simple
    const result = await client.query('SELECT NOW() as current_time');
    console.log('Consulta exitosa:', result.rows[0]);
    
    // Verificar esquemas
    const schemas = await client.query("SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'cursos'");
    if (schemas.rows.length > 0) {
      console.log('Esquema "cursos" encontrado');
    } else {
      console.log('Esquema "cursos" no encontrado');
    }
    
    // Verificar tablas
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'cursos'
    `);
    console.log('Tablas en esquema cursos:', tables.rows);
    
    client.release();
    console.log('🎉 Prueba de conexión completada exitosamente');
    
  } catch (error) {
    console.error('Error de conexión:', error.message);
    console.error('Detalles del error:', error.code || 'Sin código de error');
  } finally {
    await pool.end();
  }
}

testConnection();