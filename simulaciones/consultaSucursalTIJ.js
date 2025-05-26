const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const consultarCuentaTIJ = async () => {
  const numero_cuenta = '1001001001'; // Asegúrate que sea el número correcto
  const start = new Date();

  try {
    const res = await fetch(`http://localhost:3000/api/cuenta/${numero_cuenta}`);
    const data = await res.json();
    const end = new Date();

    console.log(`[TIJ][${start.toISOString()}] CONSULTA CUENTA ${numero_cuenta}`);
    console.log(`Cliente: ${data.cliente}`);
    console.log(`Saldo actual: $${data.saldo}`);
    console.log('Transacciones recientes:');
    data.transacciones.slice(0, 5).forEach(t => {
      console.log(`- ${t.fecha} | ${t.tipo.toUpperCase()} | $${t.monto} | ${t.sucursal}`);
    });
    console.log(`[TIJ] Terminado en: ${end.toISOString()}`);

  } catch (err) {
    console.error('[TIJ] ERROR en consulta:', err.message);
  }
};

consultarCuentaTIJ();
