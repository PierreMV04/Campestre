const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ Registro desde /api/usuarios (para frontend)
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, clave } = req.body;

    if (!nombre || !correo || !clave) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Validar si el correo ya existe
    const existente = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (existente.rows.length > 0) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, clave, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, correo, clave, 'cliente']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
});

// ✅ Ruta opcional: /api/usuarios/register (puedes eliminarla si no la usas)
router.post('/register', async (req, res) => {
  try {
    const { nombre, correo, clave } = req.body;

    if (!nombre || !correo || !clave) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, clave) VALUES ($1, $2, $3) RETURNING *',
      [nombre, correo, clave]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
});

// ✅ Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, correo, rol FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

// ✅ Editar usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, rol } = req.body;

  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre=$1, correo=$2, rol=$3 WHERE id=$4 RETURNING *',
      [nombre, correo, rol, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
});

module.exports = router;
