import { useState } from 'react';
import CuentaForm from '../components/CuentaForm';
import CuentaInfo from '../components/CuentaInfo';
import { getCuentaData } from '../api/cuentaService';

const CuentaConsulta = () => {
  const [cuenta, setCuenta] = useState(null);
  const [error, setError] = useState('');

  const manejarBusqueda = async (numeroCuenta) => {
    try {
      const data = await getCuentaData(numeroCuenta);
      setCuenta(data);
      setError('');
    } catch (err) {
      setCuenta(null);
      setError('No se encontró la cuenta o hubo un error.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Consulta de Cuenta Bancaria</h1>
      <CuentaForm onBuscar={manejarBusqueda} />

      {error && <p style={styles.error}>{error}</p>}

      {!cuenta && !error && (
        <div style={styles.placeholder}>
          <p>🔍 Ingresa un número de cuenta para consultar los datos.</p>
        </div>
      )}

      {cuenta && <CuentaInfo cuenta={cuenta} />}
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f1f4f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  error: {
    color: '#c0392b',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  placeholder: {
    backgroundColor: '#fff',
    padding: '40px',
    marginTop: '20px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '550px',
    textAlign: 'center',
    color: '#999',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
};

export default CuentaConsulta;
