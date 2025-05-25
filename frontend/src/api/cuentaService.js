export async function getCuentaData(numeroCuenta) {
  try {
    const response = await fetch(`http://localhost:3000/api/cuenta/${numeroCuenta}`);
    if (!response.ok) throw new Error("Error al consultar la cuenta");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
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
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Respuesta del servidor:', data);
      throw new Error(data?.error || data?.mensaje || 'Error en la transacción');
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
