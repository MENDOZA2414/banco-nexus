const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Jm24141002',
  database: 'nexus_banca'
});

module.exports = pool.promise();
