const API_URL = 'http://localhost:3000/api/cuenta';

// Sucursales simuladas
const sucursales = ['LPZ', 'TIJ', 'CDMX', 'GDL', 'QRO'];

// Generar operaciones por sucursal (ej. 5 por sucursal)
const operaciones = [];

sucursales.forEach(sucursal => {
  for (let i = 0; i < 5; i++) {
    const tipo = i % 2 === 0 ? 'deposito' : 'retiro'; // alterna entre depósito y retiro
    const monto = Math.floor(Math.random() * 500) + 100;

    operaciones.push({
      cuenta_id: 1,
      monto,
      sucursal,
      tipo
    });
  }
});

const ejecutarOperacion = async ({ tipo, cuenta_id, monto, sucursal }) => {
  try {
    const res = await fetch(`${API_URL}/${tipo}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cuenta_id, monto, sucursal })
    });

    const data = await res.json();
    console.log(`[${sucursal}] ${tipo.toUpperCase()} $${monto}:`, data);
  } catch (err) {
    console.error(`[${sucursal}] ERROR:`, err.message);
  }
};

const simular = async () => {
  console.log('Simulación de transacciones concurrentes...');
  await Promise.all(operaciones.map(ejecutarOperacion));
};

simular();
