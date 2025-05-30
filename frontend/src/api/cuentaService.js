export async function getCuentaData(numeroCuenta) {
  try {
    const response = await fetch(`http://localhost:3000/api/cuenta/${numeroCuenta}`, {
      timeout: 5000 // por si implementas timeout futuro
    });

    if (!response.ok) {
      throw new Error("Error al consultar la cuenta");
    }

    return await response.json();

  } catch (error) {
    console.error("Error al consultar cuenta:", error);

    // Detectar errores de red o de reconexión
    if (
      error.name === 'TypeError' ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('timeout') ||
      error.message.includes('ETIMEDOUT') ||
      error.message.includes('NetworkError')
    ) {
      throw new Error('reconexion');
    }

    throw error;
  }
}

export async function realizarTransaccion(cuenta_id, tipo, monto, sucursal = 'CDMX') {
  try {
    const response = await fetch(`http://localhost:3000/api/cuenta/${tipo}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cuenta_id: parseInt(cuenta_id),
        monto: parseFloat(monto),
        sucursal
      }),
      timeout: 5000
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Respuesta del servidor:', data);
      throw new Error(data?.error || data?.mensaje || 'Error en la transacción');
    }

    return data;

  } catch (error) {
    console.error("Error en transacción:", error);

    if (
      error.name === 'TypeError' ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('timeout') ||
      error.message.includes('ETIMEDOUT') ||
      error.message.includes('NetworkError')
    ) {
      throw new Error('reconexion');
    }

    throw error;
  }
}
