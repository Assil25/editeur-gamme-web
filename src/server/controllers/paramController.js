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
