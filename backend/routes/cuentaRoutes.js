const express = require('express');
const router = express.Router();
const { getCuentaInfo } = require('../controllers/cuentaController');

router.get('/:numero_cuenta', getCuentaInfo);

module.exports = router;
