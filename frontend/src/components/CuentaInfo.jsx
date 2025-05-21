const CuentaInfo = ({ cuenta }) => {
  if (!cuenta) return null;

  return (
    <div>
      <h2>Cuenta</h2>
      <p><strong>Número:</strong> {cuenta.cuenta}</p>
      <p><strong>Cliente:</strong> {cuenta.cliente}</p>
      <p><strong>Saldo:</strong> ${cuenta.saldo}</p>

      <h3>Transacciones</h3>
      <ul>
        {cuenta.transacciones.map((t, i) => (
          <li key={i}>
            {t.tipo} - ${t.monto} - {new Date(t.fecha).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CuentaInfo;