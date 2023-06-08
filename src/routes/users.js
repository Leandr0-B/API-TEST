const express = require('express');
const router = express.Router();
const sql = require('mssql');

module.exports = function (dbConfig) {
  router.get('/', async (req, res) => {
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

  return router;
};