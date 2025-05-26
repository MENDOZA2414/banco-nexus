const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Simulación de retiro más grande en la sucursal LPZ
const ejecutarRetiroGrandeLPZ = async () => {
  const cuenta_id = 1;
  const monto = 5000; // retiro grande
  const start = new Date();

  try {
    const res = await fetch('http://localhost:3000/api/cuenta/retiro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cuenta_id, monto, sucursal: 'LPZ' })
    });

    const data = await res.json();
    const end = new Date();
    console.log(`[LPZ][${start.toISOString()}] RETIRO $${monto}:`, data);
    console.log(`[LPZ] Terminado en: ${end.toISOString()}`);
  } catch (err) {
    console.error('[LPZ] ERROR:', err.message);
  }
};

ejecutarRetiroGrandeLPZ();
