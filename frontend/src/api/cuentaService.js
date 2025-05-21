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