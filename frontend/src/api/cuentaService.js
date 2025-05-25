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

export async function realizarTransaccion(numeroCuenta, tipo, monto) {
  try {
    const response = await fetch(`http://localhost:3000/api/cuenta/${numeroCuenta}/${tipo}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monto: parseFloat(monto) })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.mensaje || 'Error en la transacción');
    }

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
