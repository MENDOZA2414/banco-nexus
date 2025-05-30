import { useState } from 'react';
import CuentaForm from '../components/CuentaForm';
import CuentaInfo from '../components/CuentaInfo';
import { getCuentaData } from '../api/cuentaService';

const CuentaConsulta = () => {
  const [cuenta, setCuenta] = useState(null);
  const [error, setError] = useState('');
  const [conectando, setConectando] = useState(false);

  const manejarBusqueda = async (numeroCuentaParam) => {
    const cuentaID = numeroCuentaParam || cuenta?.cuenta;
    if (!cuentaID) return;

    setConectando(true); // Activar bandera de espera
    try {
      const data = await getCuentaData(cuentaID);
      setCuenta(data);
      setError('');
    } catch (err) {
      setCuenta(null);
      setError('No se encontró la cuenta o hubo un error.');
    } finally {
      setConectando(false); // Desactivar bandera de espera
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f1f4f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <h1 style={{
        fontSize: '28px',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
      }}>
        Consulta de Cuenta Bancaria
      </h1>

      <CuentaForm onBuscar={manejarBusqueda} deshabilitado={conectando} />

      {conectando && (
        <div style={{
          marginBottom: '10px',
          fontWeight: 'bold',
          color: '#d35400'
        }}>
          ⏳ Reconectando al servidor, por favor espera...
        </div>
      )}

      {error && (
        <p style={{
          color: '#c0392b',
          fontWeight: 'bold',
          marginTop: '10px',
        }}>
          {error}
        </p>
      )}

      {!cuenta && !error && (
        <div style={{
          backgroundColor: '#fff',
          padding: '40px',
          marginTop: '20px',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '550px',
          textAlign: 'center',
          color: '#999',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        }}>
          <p>🔍 Ingresa un número de cuenta para consultar los datos.</p>
        </div>
      )}

      {cuenta && (
        <CuentaInfo
          cuenta={cuenta}
          onActualizar={manejarBusqueda}
          deshabilitado={conectando}
        />
      )}
    </div>
  );
};

export default CuentaConsulta;
