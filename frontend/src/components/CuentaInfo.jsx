import { FaArrowDown, FaArrowUp, FaMoneyBillWave } from 'react-icons/fa';

const CuentaInfo = ({ cuenta }) => {
  if (!cuenta) return null;

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}><FaMoneyBillWave style={styles.icon} /> Cuenta</h2>
      <p><strong>Número:</strong> {cuenta.cuenta}</p>
      <p><strong>Cliente:</strong> {cuenta.cliente}</p>
      <p><strong>Saldo:</strong> ${cuenta.saldo}</p>

      <h3 style={{ marginTop: '20px' }}>Transacciones</h3>
      {cuenta.transacciones.length === 0 ? (
        <p>Sin transacciones registradas.</p>
      ) : (
        <ul style={styles.lista}>
          {cuenta.transacciones.map((t, i) => (
            <li key={i} style={styles.transaccion}>
              {t.tipo === 'deposito' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
              <span style={{ marginLeft: 10 }}>
                {t.tipo} - ${t.monto} - {new Date(t.fecha).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
    marginTop: '20px',
  },
  heading: {
    fontSize: '22px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  icon: {
    color: '#2980b9',
  },
  lista: {
    listStyle: 'none',
    paddingLeft: 0,
    marginTop: '10px',
  },
  transaccion: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '16px',
  },
};

export default CuentaInfo;
