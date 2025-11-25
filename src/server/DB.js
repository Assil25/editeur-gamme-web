const sql = require('mssql/msnodesqlv8'); // driver MS Nodesqlv8

const config = {
  server: '(localdb)\\MSSQLLocalDB', 
  database: 'ENG100',
  options: {
    trustedConnection: true
  }
};

// Créer un pool global pour toutes les requêtes
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Connexion SQL Server réussie');
    return pool;
  })
  .catch(err => console.error('❌ Erreur de connexion SQL :', err));

module.exports = { sql, poolPromise };

// Exemple test dans un async IIFE
(async () => {
  try {
    const pool = await poolPromise;              // on attend que le pool soit connecté
    const result = await pool.request().query('SELECT TOP 5 name FROM sys.tables');
    console.log('📋 Tables dans ENG100 :', result.recordset);
  } catch (err) {
    console.error('❌ Erreur SQL :', err);
  }
})();
