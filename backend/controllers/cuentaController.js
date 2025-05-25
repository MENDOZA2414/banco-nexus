const db = require('../config/db');

const getCuentaInfo = async (req, res) => {
  const { numero_cuenta } = req.params;

  try {
    // Obtener datos de la cuenta y el cliente
    const [cuentaData] = await db.query(`
      SELECT c.id AS cuenta_id, c.numero_cuenta, c.saldo, cl.nombre
      FROM cuentas c
      JOIN clientes cl ON cl.id = c.cliente_id
      WHERE c.numero_cuenta = ?
    `, [numero_cuenta]);

    if (cuentaData.length === 0) {
      return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
    }

    const cuenta = cuentaData[0];

    // Obtener transacciones con sucursal y fecha
    const [transacciones] = await db.query(`
      SELECT tipo, monto, sucursal, fecha
      FROM transacciones
      WHERE cuenta_id = ?
      ORDER BY fecha DESC
    `, [cuenta.cuenta_id]);

    res.json({
      cuenta_id: cuenta.cuenta_id,
      cuenta: cuenta.numero_cuenta,
      cliente: cuenta.nombre,
      saldo: cuenta.saldo,
      transacciones
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

const depositar = async (req, res) => {
  const { cuenta_id, monto, sucursal } = req.body;

  // Validaciones
  if (!cuenta_id || !monto || !sucursal) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  if (monto <= 0) {
    return res.status(400).json({ error: 'El monto debe ser mayor a cero.' });
  }

  try {
    // Verificar que la cuenta exista
    const [cuenta] = await db.query('SELECT * FROM cuentas WHERE id = ?', [cuenta_id]);
    if (cuenta.length === 0) {
      return res.status(404).json({ error: 'La cuenta no existe.' });
    }

    // Insertar transacción
    await db.query(
      'INSERT INTO transacciones (cuenta_id, tipo, monto, sucursal) VALUES (?, "deposito", ?, ?)',
      [cuenta_id, monto, sucursal]
    );

    // Actualizar saldo
    await db.query(
      'UPDATE cuentas SET saldo = saldo + ? WHERE id = ?',
      [monto, cuenta_id]
    );

    res.status(200).json({ mensaje: 'Depósito exitoso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const retirar = async (req, res) => {
  const { cuenta_id, monto, sucursal } = req.body;

  // Validaciones básicas
  if (!cuenta_id || !monto || !sucursal) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  if (monto <= 0) {
    return res.status(400).json({ error: 'El monto debe ser mayor a cero.' });
  }

  try {
    // Obtener la cuenta
    const [cuenta] = await db.query('SELECT saldo FROM cuentas WHERE id = ?', [cuenta_id]);
    if (cuenta.length === 0) {
      return res.status(404).json({ error: 'La cuenta no existe.' });
    }

    const saldoActual = cuenta[0].saldo;

    if (saldoActual < monto) {
      return res.status(400).json({ error: 'Saldo insuficiente para realizar el retiro.' });
    }

    // Registrar transacción
    await db.query(
      'INSERT INTO transacciones (cuenta_id, tipo, monto, sucursal) VALUES (?, "retiro", ?, ?)',
      [cuenta_id, monto, sucursal]
    );

    // Actualizar saldo
    await db.query(
      'UPDATE cuentas SET saldo = saldo - ? WHERE id = ?',
      [monto, cuenta_id]
    );

    res.status(200).json({ mensaje: 'Retiro exitoso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  depositar,
  retirar,
  getCuentaInfo
};
