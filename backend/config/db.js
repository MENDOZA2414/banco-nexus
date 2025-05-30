const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;
let isReadOnly = false; // Indicador global
let currentHost = 'localhost'; // Host actual conectado

// Configuración del nodo maestro
const masterConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
};

// Configuraciones de réplicas
const replicaConfigs = [
  {
    host: process.env.REPLICA1_HOST,
    user: process.env.REPLICA1_USER,
    password: process.env.REPLICA1_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  },
  {
    host: process.env.REPLICA2_HOST,
    user: process.env.REPLICA2_USER,
    password: process.env.REPLICA2_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  },
  {
    host: process.env.REPLICA3_HOST,
    user: process.env.REPLICA3_USER,
    password: process.env.REPLICA3_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
  }
];

// Conexión principal a maestro, o réplicas si falla
async function connectToDatabase() {
  try {
    pool = await mysql.createPool(masterConfig);
    await pool.query('SELECT 1');
    isReadOnly = false;
    currentHost = masterConfig.host;
    console.log('✅ Conectado al nodo maestro');
  } catch (err) {
    console.warn('⚠️ Nodo maestro no disponible, intentando con réplicas...');
    for (const config of replicaConfigs) {
      try {
        pool = await mysql.createPool(config);
        await pool.query('SELECT 1');
        isReadOnly = true;
        currentHost = config.host;
        console.log(`🟢 Conectado a réplica en ${config.host}`);
        break;
      } catch (replicaErr) {
        console.warn(`❌ No se pudo conectar a la réplica en ${config.host}`);
      }
    }

    if (!pool) {
      console.error('🚫 No se pudo conectar ni al maestro ni a las réplicas.');
      process.exit(1);
    }
  }
}

connectToDatabase();

module.exports = {
  query: async (...args) => {
    try {
      return await pool.query(...args);
    } catch (error) {
      console.error('❌ Error al consultar. Intentando reconectar...', error.code);

      // Intentar reconectar a base disponible
      await connectToDatabase();

      try {
        return await pool.query(...args); // Reintento
      } catch (secondError) {
        console.error('🚫 Fallo también el reintento de conexión.');
        throw secondError;
      }
    }
  },
  pool,
  isReadOnly: () => isReadOnly
};
