const { poolPromise } = require('../DB');

// Paramètres Move Robot
exports.getMoveRobotParam = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('seqId', id)
      .query('SELECT * FROM ParametresMoveRobot WHERE SequenceId = @seqId');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur lors de la récupération des paramètres Move Robot :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


// Paramètres Prise de Vue
exports.getPriseDeVueParam = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('seqId', id)
      .query('SELECT * FROM ParametresPrisedeVue WHERE SequenceId = @seqId');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur lors de la récupération des paramètres Prise de Vue :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};



exports.getParamStructure = async (req, res) => {
  const typeId = parseInt(req.params.typeId);

  const tableMap = {
    1: 'ParametresComposant',
    2: 'ParametresCtrlTemperature',
    3: 'ParamatresVissage',
    4: 'ParametresPrisedeVue',
    5: 'ParamatresPresse',
    6: 'ParametresPrint',
    7: 'ParametresConsommationEnergie',
    8: 'ParametresRivetage',
    9: 'ParametresToolIdentification',
    10: 'ParametresPicking',
    11: 'ParametresInstruction',
    12: 'ParametresMoveRobot',
    13: 'ParametresChauffe'
  };

  const tableName = tableMap[typeId];
  if (!tableName) return res.status(400).json({ error: "TypeId invalide" });

  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_NAME = '${tableName}'
    `);

    const columns = result.recordset.map(c => c.COLUMN_NAME);
    res.json({
      tableName,
      columns
    });

  } catch (err) {
    console.error("Erreur structure paramètres :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};







// Ajouter les paramètres d'une séquence
exports.updateSequenceParams = async (req, res) => {
  const sequenceId = req.params.sequenceId;
  const { tableName, data } = req.body;

  if (!tableName || !sequenceId) {
    return res.status(400).json({ error: "sequenceId ou tableName manquant" });
  }

  try {
    const pool = await poolPromise;

    const setClause = Object.keys(data)
      .filter(col => col !== "Id" && col !== "SequenceId") // ne pas modifier Id et SequenceId
      .map(col => `${col} = @${col}`)
      .join(", ");

    const request = pool.request();

    // Ajouter toutes les valeurs en paramètres SQL
    Object.entries(data).forEach(([col, val]) => {
      if (col !== "Id" && col !== "SequenceId") {
        request.input(col, val);
      }
    });

    // Update dynamique
    await request
      .input("SequenceId", sequenceId)
      .query(`UPDATE ${tableName} SET ${setClause} WHERE SequenceId = @SequenceId`);

    res.json({ message: "Paramètres mis à jour avec succès" });

  } catch (err) {
    console.error("Erreur mise à jour paramètres :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};



