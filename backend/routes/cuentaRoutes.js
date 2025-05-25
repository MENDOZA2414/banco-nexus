const express = require('express');
const router = express.Router();
const cuentaController = require('../controllers/cuentaController');

router.get('/:numero_cuenta', cuentaController.getCuentaInfo);
router.post('/deposito', cuentaController.depositar);
router.post('/retiro', cuentaController.retirar);

module.exports = router;
