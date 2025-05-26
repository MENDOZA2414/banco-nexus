const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Simulación de retiro en la sucursal GDL
const ejecutarRetiroGDL = async () => {
  const cuenta_id = 1;
  const monto = 150; // retiro pequeño
  const start = new Date();

  try {
    const res = await fetch('http://localhost:3000/api/cuenta/retiro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cuenta_id, monto, sucursal: 'GDL' })
    });

    const data = await res.json();
    const end = new Date();
    console.log(`[GDL][${start.toISOString()}] RETIRO $${monto}:`, data);
    console.log(`[GDL] Terminado en: ${end.toISOString()}`);
  } catch (err) {
    console.error('[GDL] ERROR:', err.message);
  }
};

ejecutarRetiroGDL();
