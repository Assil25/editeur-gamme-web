const { poolPromise } = require('../DB');

// 🔹 Map TypeId → Nom de table
const paramTableMap = {
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

// ----------------------------------------------------
// 🔹 GET ALL SEQUENCES
// ----------------------------------------------------
exports.getAllSequences = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Seq');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur récupération séquences :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ----------------------------------------------------
// 🔹 GET SEQUENCES BY OPERATION (CycleId)
// ----------------------------------------------------
exports.getSequencesByOperationId = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query('SELECT * FROM Seq WHERE CycleId = @id');

    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur récupération séquences :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ----------------------------------------------------
// 🔹 CREATE SEQUENCE + CREATE EMPTY PARAM ROW
// ----------------------------------------------------
exports.createSequence = async (req, res) => {
  try {
    const { TypeId, SeqName, SeqNr, CycleId } = req.body;

    if (!TypeId || !SeqName || !SeqNr || !CycleId) {
      return res.status(400).json({ error: 'Champs manquants.' });
    }

    const pool = await poolPromise;

    // ⭐ 1 — Créer la séquence
    const insertSeq = await pool.request()
      .input('TypeId', TypeId)
      .input('SeqName', SeqName)
      .input('SeqNr', SeqNr)
      .input('CycleId', CycleId)
      .query(`
        INSERT INTO Seq (TypeId, SeqName, SeqNr, CycleId)
        OUTPUT INSERTED.Id
        VALUES (@TypeId, @SeqName, @SeqNr, @CycleId)
      `);

    const sequenceId = insertSeq.recordset[0].Id;

    // ⭐ 2 — Trouver la table paramètre correspondant au TypeId
    const paramTable = paramTableMap[TypeId];

    if (!paramTable) {
      return res.status(500).json({ error: "TypeId sans table paramètre associée." });
    }

    // ⭐ 3 — Récupérer la liste des colonnes sauf Id et SequenceId
    const colsResult = await pool.request().query(`
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_NAME = '${paramTable}'
      AND COLUMN_NAME NOT IN ('Id', 'SequenceId')
    `);

    const columns = colsResult.recordset.map(c => c.COLUMN_NAME);

    // Construire les colonnes (SequenceId + colonnes vides)
    const columnNames = ['SequenceId', ...columns].join(', ');
    const paramNames = ['@SequenceId', ...columns.map(c => `@${c}`)].join(', ');

    const reqInsert = pool.request();
    reqInsert.input('SequenceId', sequenceId);

    // toutes les colonnes paramètre sont nulles au début
    columns.forEach(col => reqInsert.input(col, null));

    // ⭐ 4 — Insérer la ligne vide dans la table paramètre
    await reqInsert.query(`
      INSERT INTO ${paramTable} (${columnNames})
      VALUES (${paramNames})
    `);

    res.status(201).json({
      message: 'Séquence + paramètres créés',
      sequenceId,
      paramTable
    });

  } catch (err) {
    console.error('Erreur createSequence :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ----------------------------------------------------
// 🔹 UPDATE SEQUENCE
// ----------------------------------------------------
exports.updateSequence = async (req, res) => {
  try {
    const { id } = req.params;
    const { TypeId, SeqName, SeqNr } = req.body;

    if (!TypeId || !SeqName || !SeqNr) {
      return res.status(400).send('Champs obligatoires manquants.');
    }

    const pool = await poolPromise;
    await pool.request()
      .input('Id', id)
      .input('TypeId', TypeId)
      .input('SeqName', SeqName)
      .input('SeqNr', SeqNr)
      .query(`
        UPDATE Seq
        SET TypeId = @TypeId,
            SeqName = @SeqName,
            SeqNr = @SeqNr
        WHERE Id = @Id
      `);

    res.send('Sequence mise à jour');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
};

// ----------------------------------------------------
// 🔹 DELETE SEQUENCE
// ----------------------------------------------------
exports.deleteSequence = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;

    await pool.request()
      .input('id', id)
      .query(`DELETE FROM Seq WHERE Id = @id`);

    res.json({ message: 'Séquence supprimée' });
  } catch (err) {
    console.error('Erreur suppression séquence :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ----------------------------------------------------
// 🔹 GET ALL TYPES
// ----------------------------------------------------
exports.getAllTypeSequences = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT Id, SeqType FROM TypeSequence');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur récup types :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
