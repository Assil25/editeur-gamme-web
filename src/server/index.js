const express = require('express');
const os = require('os');
const path = require('path');
const { sql, connectDB } = require('./DB');  // ./db = chemin relatif vers db.js
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const gammeRoutes = require('./routes/gammeRoutes');
const operationRoutes = require('./routes/operationRoutes');
const sequenceRoutes = require('./routes/sequenceRoutes');
const paramRoutes = require('./routes/paramRoutes');

// Routes API
app.use('/api/gammes', gammeRoutes);
app.use('/api/operations', operationRoutes);
app.use('/api/sequences', sequenceRoutes);
app.use('/api', paramRoutes);




// Servir React



app.use(express.static(path.join(__dirname, '../../dist')));

// Redirection pour React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.listen(8081, () => console.log('Listening on port 8081!'));
