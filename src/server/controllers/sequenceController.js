const { poolPromise } = require('../DB'); // récupérer le pool connecté

// 🔹 Récupérer toutes les séquences
exports.getAllSequences = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Seq');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur lors de la récupération des séquences :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 Récupérer les séquences d’une opération (Cycle)
exports.getSequencesByOperationId = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query('SELECT * FROM Seq WHERE CycleId = @id'); // 🔹 colonne mise à jour
    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur lors de la récupération des séquences :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 Créer une séquence
exports.createSequence = async (req, res) => {
  try {
    const { TypeId,SeqName, SeqNr, CycleId} = req.body;
    if (!TypeId || !SeqName || !SeqNr || !CycleId) {
      return res.status(400).json({ error: 'Les champs nom et operationId sont obligatoires.' });
    }

    const pool = await poolPromise;
    await pool.request()
      .input('TypeId', TypeId)
      .input('SeqName', SeqName)
      .input('SeqNr', SeqNr)
      .input('CycleId', CycleId)
      .query('INSERT INTO Seq (TypeId, SeqName, SeqNr, CycleId) VALUES (@TypeId, @SeqName, @SeqNr,@CycleId)'); 

    res.status(201).json({ message: 'Séquence créée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la création de la séquence :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 Récupérer la liste des types de séquences
exports.getAllTypeSequences = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT Id, SeqType FROM TypeSequence');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur lors de la récupération des types de séquence :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};




// 🔹 Mettre à jour une séquence
exports.updateSequence = async (req, res) => {
  try {
    const { id } = req.params;
    const { TypeId,SeqName, SeqNr} = req.body;

    if (!TypeId || !SeqName || !SeqNr) {
      return res.status(400).send('Tous les champs sont obligatoires');
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

    res.send('Sequence mise à jour avec succès');
  } catch (err) {
    console.error(err);
    // res.status(500).send(err.message);
  }
};

// 🔹 Supprimer une séquence
exports.deleteSequence = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .query('DELETE FROM Seq WHERE Id = @id');

    res.json({ message: 'Séquence supprimée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la modification de la séquence :', err);
  }
};

