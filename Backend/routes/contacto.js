const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ GET - Mostrar todos los mensajes de contacto
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM contacto ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error al obtener mensajes de contacto' });
  }
});

// ✅ POST - Guardar un nuevo mensaje
router.post('/', async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  try {
    await pool.query(
      `INSERT INTO contacto (nombre, correo, asunto, mensaje)
       VALUES ($1, $2, $3, $4)`,
      [nombre, correo, asunto, mensaje]
    );

    res.status(200).json({ mensaje: 'Mensaje enviado y guardado correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar mensaje:', error);
    res.status(500).json({ error: 'Error al guardar el mensaje en la base de datos' });
  }
});

module.exports = router;
