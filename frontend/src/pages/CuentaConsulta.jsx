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
    <div>
      <h1>Consulta de Cuenta Bancaria</h1>
      <CuentaForm onBuscar={manejarBusqueda} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CuentaInfo cuenta={cuenta} />
    </div>
  );
};

export default CuentaConsulta;