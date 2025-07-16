// routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ LOGIN
router.post('/login', async (req, res) => {
  const { correo, clave } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE correo = $1 AND clave = $2',
      [correo, clave]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas o usuario no registrado' });
    }

    const usuario = result.rows[0];
    res.json({ correo: usuario.correo, rol: usuario.rol, nombre: usuario.nombre });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ mensaje: 'Error al procesar el login' });
  }
});

module.exports = router;
