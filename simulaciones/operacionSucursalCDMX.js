const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Simulación de depósito en la sucursal CDMX
const ejecutarDepositoCDMX = async () => {
  const cuenta_id = 1;
  const monto = 300;

  const start = new Date();

  try {
    const res = await fetch('http://localhost:3000/api/cuenta/deposito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cuenta_id, monto, sucursal: 'CDMX' })
    });

    const data = await res.json();
    const end = new Date();
    console.log(`[CDMX][${start.toISOString()}] DEPÓSITO $${monto}:`, data);
    console.log(`[CDMX] Terminado en: ${end.toISOString()}`);
  } catch (err) {
    console.error('[CDMX] ERROR:', err.message);
  }
};

ejecutarDepositoCDMX();
