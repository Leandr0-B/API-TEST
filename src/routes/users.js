const express = require('express');
const router = express.Router();
const sql = require('mssql');

module.exports = function (dbConfig) {
  router.get('/list', async (req, res) => {
    try {
      await sql.connect(dbConfig);
      const result = await sql.query('SELECT * FROM Usuario');
      res.json(result.recordset);
    } catch (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).send('Error interno del servidor');
    } finally {
      sql.close();
    }
  });

  router.post('/crear', async (req, res) => {
    try {
      const { ci, nombre, pass, administrador, inactivo } = req.body;
      await sql.connect(dbConfig);
  
      const request = new sql.Request();
  
      
      const query = `INSERT INTO Usuario (ci, nombre, pass, administrador, inactivo) 
      VALUES (@ci, @nombre, @pass, @administrador, @inactivo)`;
      
      request.input('ci', sql.VarChar, ci); // Declarar el parámetro @ci y asignarle el valor
      request.input('nombre', sql.VarChar, nombre);
      request.input('pass', sql.VarChar, pass);
      request.input('administrador', sql.Bit, administrador);
      request.input('inactivo', sql.Bit, inactivo);
  
      await request.query(query);
  
      res.send('Usuario creado exitosamente');
    } catch (err) {
      console.error('Error al crear el usuario:', err);
      res.status(500).send('Error interno del servidor');
    } finally {
      sql.close();
    }
  });

  return router;
};