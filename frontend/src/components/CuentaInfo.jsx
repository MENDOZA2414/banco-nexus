import { useState } from 'react';
import { FaArrowDown, FaArrowUp, FaMoneyBillWave } from 'react-icons/fa';
import { realizarTransaccion } from '../api/cuentaService';

const CuentaInfo = ({ cuenta, onActualizar, deshabilitado = false }) => {
  const [monto, setMonto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarAccion = async (tipo) => {
    if (deshabilitado) return;

    if (!monto || isNaN(monto) || parseFloat(monto) <= 0) {
      setMensaje('❌ Ingresa un monto válido.');
      return;
    }

    try {
      const data = await realizarTransaccion(cuenta.cuenta_id, tipo, monto);
      console.log('Respuesta del backend:', data);

      setMensaje(`✅ ${tipo === 'deposito' ? 'Depósito' : 'Retiro'} exitoso.`);
      onActualizar(cuenta.numero_cuenta);
    } catch (error) {
      setMensaje(`❌ ${error.message}`);
    }

    setTimeout(() => setMensaje(''), 3000);
    setMonto('');
  };

  if (!cuenta) return null;

  const getColorSucursal = (sucursal) => {
    switch (sucursal) {
      case 'LPZ': return '#16a085';
      case 'TIJ': return '#2980b9';
      case 'CDMX': return '#8e44ad';
      case 'GDL': return '#d35400';
      default: return '#7f8c8d';
    }
  };

  const getIconSucursal = (sucursal) => {
    switch (sucursal) {
      case 'LPZ': return '🌊';
      case 'TIJ': return '🌉';
      case 'CDMX': return '🏙️';
      case 'GDL': return '🎸';
      default: return '📍';
    }
  };

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

      <h3 style={{ marginTop: '20px' }}>Transacciones ({cuenta.transacciones.length})</h3>

      {cuenta.transacciones.length === 0 ? (
        <p>Sin transacciones registradas.</p>
      ) : (
        <div style={{
          maxHeight: '220px',
          overflowY: 'auto',
          marginTop: '10px',
          border: '1px solid #eee',
          padding: '10px',
          borderRadius: '6px'
        }}>
          <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
            {cuenta.transacciones.map((t, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '15px' }}>
                <strong style={{ marginRight: 8 }}>#{i + 1}</strong>
                {t.tipo === 'deposito' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                <span style={{ marginLeft: 10 }}>
                  {t.tipo} - ${t.monto} -
                  <span style={{
                    color: getColorSucursal(t.sucursal),
                    fontWeight: 'bold',
                    marginLeft: '6px',
                    marginRight: '6px'
                  }}>
                    {getIconSucursal(t.sucursal)} {t.sucursal}
                  </span>
                  - {new Date(t.fecha).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
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
          disabled={deshabilitado}
        />
        <button
          onClick={() => manejarAccion('deposito')}
          disabled={deshabilitado}
          style={{
            padding: '8px 14px',
            backgroundColor: deshabilitado ? '#95a5a6' : '#27ae60',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: deshabilitado ? 'not-allowed' : 'pointer'
          }}
        >
          Depositar
        </button>
        <button
          onClick={() => manejarAccion('retiro')}
          disabled={deshabilitado}
          style={{
            padding: '8px 14px',
            backgroundColor: deshabilitado ? '#95a5a6' : '#c0392b',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: deshabilitado ? 'not-allowed' : 'pointer'
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
