import { useState } from 'react';

const CuentaForm = ({ onBuscar }) => {
  const [numeroCuenta, setNumeroCuenta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numeroCuenta.trim() !== '') {
      onBuscar(numeroCuenta.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Número de cuenta"
        value={numeroCuenta}
        onChange={(e) => setNumeroCuenta(e.target.value)}
      />
      <button type="submit">Consultar</button>
    </form>
  );
};

export default CuentaForm;