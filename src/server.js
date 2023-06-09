const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

//settings
app.set('port', process.env.PORT || 5000);
const whiteList = ['http://localhost','https://fluttertestappnoti.azurewebsites.net']

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
// app.use(cors({
//   origin:whiteList
// }));
app.use(bodyParser.json()) 
// Rutas de users
const usersRoutes = require('./routes/users')(dbConfig);
app.use('/users', usersRoutes);
app.use('/users', usersRoutes);

app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto', app.get('port'));
});