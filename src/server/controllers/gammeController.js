const { poolPromise } = require('../DB'); // importer le pool connecté

// Récupérer toutes les gammes
exports.getAllGammes = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Reference');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// Récupérer une gamme par ID
exports.getGammeById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', id)
      .query('SELECT * FROM Reference WHERE id = @id');
    res.json(result.recordset[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// Créer une nouvelle gamme
exports.createGamme = async (req, res) => {
  try {
    const { ManufactRoutingCode, ManufactRoutingVersion, PartReference, PartDescription} = req.body;
    

    if (!ManufactRoutingCode || !ManufactRoutingVersion || !PartReference || !PartDescription) {
      return res.status(400).send('Tous les champs sont obligatoires');
    }

    const pool = await poolPromise;
    await pool.request()
      .input('ManufactRoutingCode', ManufactRoutingCode)
      .input('ManufactRoutingVersion',  ManufactRoutingVersion)
      .input('PartReference', PartReference)
      .input('PartDescription', PartDescription)
      .query(`INSERT INTO Reference (ManufactRoutingCode, ManufactRoutingVersion, PartReference, PartDescription) 
              VALUES (@ManufactRoutingCode, @ManufactRoutingVersion, @PartReference, @PartDescription)`);


    res.send('Gamme ajoutée avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};


// Mettre à jour une gamme
exports.updateGamme = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.body;

    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .input('nom', nom)
      .query('UPDATE Reference SET nom = @nom WHERE id = @id');

    res.send('Gamme mise à jour avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// Supprimer une gamme
exports.deleteGamme = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id', id)
      .query('DELETE FROM Reference WHERE id = @id');

    res.send('Gamme supprimée avec succès');
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
