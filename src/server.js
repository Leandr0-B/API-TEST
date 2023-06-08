const express = require('express');
const app = express();
const sql = require('mssql');

const dbConfig = {
  server: 'residencialesproyecto.database.windows.net',
  database: 'ResidencialesProyecto',
  user: 'residencial',
  password: 'Clave123#',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

// Rutas
const usersRoutes = require('./routes/users')(dbConfig);

app.use('/users', usersRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});