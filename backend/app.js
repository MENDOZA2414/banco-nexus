const express = require('express');
const cors = require('cors');
const cuentaRoutes = require('./routes/cuentaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/cuenta', cuentaRoutes);

module.exports = app;
