const express = require('express');
const app = express();
const cors = require('cors');

//settings
app.set('port', process.env.PORT || 5000);
//const whiteList = ['http://localhost','https://fluttertestappnoti.azurewebsites.net']

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

//midelwares
app.use(cors());

// Rutas
const usersRoutes = require('./routes/users')(dbConfig);

app.use('/users', usersRoutes);

app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto', app.get('port'));
});