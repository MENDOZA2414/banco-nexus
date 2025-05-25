import { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaMoneyBillWave } from 'react-icons/fa';
import { realizarTransaccion } from '../api/cuentaService';

const CuentaInfo = ({ cuenta, onActualizar }) => {
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarAccion = async (tipo) => {
    if (!monto || isNaN(monto) || parseFloat(monto) <= 0) {
      setMensaje('❌ Ingresa un monto válido.');
      return;
    }

    try {
      await realizarTransaccion(cuenta.cuenta, tipo, monto);
      setMensaje(`✅ ${tipo === 'deposito' ? 'Depósito' : 'Retiro'} exitoso.`);
      onActualizar(cuenta.cuenta); // Recarga los datos de la cuenta
    } catch (error) {
      setMensaje(`❌ ${error.message}`);
    }

    setTimeout(() => setMensaje(''), 3000);
    setMonto('');
  };

  if (!cuenta) return null;

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, sans-serif',
      marginTop: '20px'
    }}>
      <h2 style={{
        fontSize: '22px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <FaMoneyBillWave style={{ color: '#2980b9' }} /> Cuenta
      </h2>

      <p><strong>Número:</strong> {cuenta.cuenta}</p>
      <p><strong>Cliente:</strong> {cuenta.cliente}</p>
      <p><strong>Saldo:</strong> ${cuenta.saldo}</p>

      <h3 style={{ marginTop: '20px' }}>Transacciones</h3>
      {cuenta.transacciones.length === 0 ? (
        <p>Sin transacciones registradas.</p>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '10px' }}>
          {cuenta.transacciones.map((t, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '16px' }}>
              {t.tipo === 'deposito' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
              <span style={{ marginLeft: 10 }}>
                {t.tipo} - ${t.monto} - {new Date(t.fecha).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '16px',
            width: '120px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={() => manejarAccion('deposito')}
          style={{
            padding: '8px 14px',
            backgroundColor: '#27ae60',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Depositar
        </button>
        <button
          onClick={() => manejarAccion('retiro')}
          style={{
            padding: '8px 14px',
            backgroundColor: '#c0392b',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retirar
        </button>
      </div>

      {mensaje && (
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{mensaje}</p>
      )}
    </div>
  );
};

export default CuentaInfo;
