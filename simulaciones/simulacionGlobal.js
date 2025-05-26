const { exec } = require('child_process');

const scripts = [
  'operacionSucursalCDMX.js',
  'operacionSucursalGDL.js',
  'operacionSucursalLPZ.js',
  'consultaSucursalTIJ.js'
];

console.log('🚀 Iniciando simulación global de sucursales...\n');

scripts.forEach(script => {
  exec(`node ${script}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error en ${script}:`, error.message);
      return;
    }
    if (stderr) {
      console.error(`⚠️  Stderr en ${script}:`, stderr);
    }
    console.log(`✅ Resultado de ${script}:\n${stdout}`);
  });
});