import { useState } from 'react';

const CuentaForm = ({ onBuscar, deshabilitado }) => {
  const [numeroCuenta, setNumeroCuenta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numeroCuenta.trim() !== '') {
      onBuscar(numeroCuenta.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Número de cuenta"
        value={numeroCuenta}
        onChange={(e) => setNumeroCuenta(e.target.value)}
        disabled={deshabilitado}
        style={styles.input}
      />
      <button
        type="submit"
        disabled={deshabilitado}
        style={{
          ...styles.button,
          backgroundColor: deshabilitado ? '#ccc' : '#2980b9',
          cursor: deshabilitado ? 'not-allowed' : 'pointer'
        }}
      >
        {deshabilitado ? 'Esperando...' : 'Consultar'}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    flex: '1',
    maxWidth: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
};

export default CuentaForm;
