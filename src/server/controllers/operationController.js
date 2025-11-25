const { poolPromise } = require('../DB'); // récupérer le pool connecté

// 🔹 Récupérer toutes les opérations
exports.getAllOperations = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM OP');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur lors de la récupération des opérations :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};



// 🔹 Récupérer les opérations d’une gamme spécifique
exports.getOperationsByGammeId = async (req, res) => {
  try {
 const { id } = req.params;
    const pool = await poolPromise;

    const result = await pool.request()
      .input('id', id)
      .query(`
        SELECT 
          OP.CycleId,
          OP.NumOP,
          OP.WorkstationId,
          OP.Position,
          Cycle.opManufacturingRoutingCode,
          Cycle.opManufacturingRoutingVersion
        FROM [ENG100].[dbo].[OP] AS OP
        INNER JOIN [ENG100].[dbo].[Cycle] AS Cycle
          ON OP.CycleId = Cycle.Id
        WHERE OP.ReferenceId = @id
        ORDER BY OP.Position ASC
      `);

    res.json(result.recordset);

  } catch (err) {
    console.error('Erreur lors de la récupération des opérations par gamme :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 Créer une opération

exports.createOperation = async (req, res) => {
  try {
    const {Position,opManufacturingRoutingCode, opManufacturingRoutingVersion, NumOP, WorkstationId, gammeId} = req.body;
    if (!opManufacturingRoutingCode || !opManufacturingRoutingVersion) {
      return res.status(400).json({ error: 'Les champs nom et gammeId sont obligatoires.' });
    }

    const pool = await poolPromise;
    
    // D'abord insérer dans Cycle
const cycleResult = await pool.request()
  .input('opManufacturingRoutingCode', opManufacturingRoutingCode)
  .input('opManufacturingRoutingVersion', opManufacturingRoutingVersion)
  .query(`
    INSERT INTO Cycle (opManufacturingRoutingCode, opManufacturingRoutingVersion)
    VALUES (@opManufacturingRoutingCode, @opManufacturingRoutingVersion);
    SELECT SCOPE_IDENTITY() AS IdCycle;
  `);

// 2️⃣ Récupérer l'ID du cycle ajouté
const IdCycle = cycleResult.recordset[0].IdCycle;

// 3️⃣ Insérer dans OP en utilisant cet ID
await pool.request()
  .input('Position', Position)
  .input('NumOP', NumOP)
  .input('WorkstationId', WorkstationId)
  .input('gammeId', gammeId)
  .input('CycleId', IdCycle) // 🟢 On utilise l'ID du cycle
  .query(`
    INSERT INTO OP (Position, NumOP, WorkstationId, ReferenceId, CycleId)
    VALUES (@Position, @NumOP, @WorkstationId, @gammeId, @CycleId)
  `);

res.status(201).json({ message: 'Opération créée avec succès', IdCycle })
  } catch (err) {
    console.error('Erreur lors de la création de l’opération :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 Mettre à jour une opération
exports.updateOperation = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description } = req.body;

    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .input('nom', nom)
      .input('description', description || null)
      .query('UPDATE OP SET Nom = @nom, Description = @description WHERE Id = @id');

    res.json({ message: 'Opération mise à jour avec succès' });
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l’opération :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 Supprimer une opération
exports.deleteOperation = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .query('DELETE FROM OP WHERE Id = @id');

    res.json({ message: 'Opération supprimée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression de l’opération :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
