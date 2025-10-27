//  # datos de conexión MSSQL
module.exports = {
  server: "localhost",               // 👈 Usar localhost
  port: 63867,                       // 👈 Puerto dinámico de SQL Express
  database: "proyectoGT2025",
  user: "sa",                        // 👈 Usuario SQL Server
  password: "Peti0694",              // 👈 Contraseña SQL Server
  options: {
    encrypt: true,                   // 👈 Cambiar a true porque en SSMS está "Mandatory"
    trustServerCertificate: true,    // 👈 Mantener como true
    enableArithAbort: true,          // 👈 Opción adicional para estabilidad
    connectionTimeout: 30000,        // 👈 Aumentar timeout
    requestTimeout: 30000            // 👈 Aumentar timeout
  }
};