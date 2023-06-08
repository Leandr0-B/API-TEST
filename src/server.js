const express = require('express');
const app = express();
const sql = require('mssql');

//settings
app.set('port', process.env.PORT || 5000);

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

app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto', app.get('port'));
});