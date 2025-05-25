// consultaFinal.js
const API_URL = 'http://localhost:3000/api/cuenta';
const numeroCuenta = 1001001001; // Cambia si prueban otra cuenta

(async () => {
  const res = await fetch(`${API_URL}/${numeroCuenta}`);
  const data = await res.json();

  console.log('\n===== SALDO FINAL =====');
  console.log(`Cuenta: ${data.cuenta}`);
  console.log(`Cliente: ${data.cliente}`);
  console.log(`Saldo final: $${data.saldo}`);

  console.log('\n===== TRANSACCIONES =====');
  data.transacciones.forEach(t =>
    console.log(`${t.fecha} | ${t.sucursal} | ${t.tipo.toUpperCase()} | $${t.monto}`)
  );
})();
