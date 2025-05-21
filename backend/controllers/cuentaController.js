const db = require('../config/db');

const getCuentaInfo = async (req, res) => {
  const { numero_cuenta } = req.params;

  try {
    const [cuentaData] = await db.query(`
      SELECT c.numero_cuenta, c.saldo, cl.nombre
      FROM cuentas c
      JOIN clientes cl ON cl.id = c.cliente_id
      WHERE c.numero_cuenta = ?
    `, [numero_cuenta]);

    if (cuentaData.length === 0) {
      return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
    }

    const [transacciones] = await db.query(`
      SELECT tipo, monto, fecha
      FROM transacciones
      WHERE cuenta_id = (
        SELECT id FROM cuentas WHERE numero_cuenta = ?
      )
      ORDER BY fecha DESC
    `, [numero_cuenta]);

    res.json({
      cuenta: cuentaData[0].numero_cuenta,
      cliente: cuentaData[0].nombre,
      saldo: cuentaData[0].saldo,
      transacciones
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

module.exports = {
  getCuentaInfo
};
