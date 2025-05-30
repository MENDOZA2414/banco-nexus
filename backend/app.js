const express = require('express');
const cors = require('cors');
const cuentaRoutes = require('./routes/cuentaRoutes');
const statusRoutes = require('./routes/statusRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cuenta', cuentaRoutes);
app.use('/api/status', statusRoutes);

module.exports = app;
