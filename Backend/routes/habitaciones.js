const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todas las habitaciones
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM habitaciones ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener habitaciones:', error);
    res.status(500).json({ error: 'Error al obtener habitaciones' });
  }
});

// Crear habitación (incluye validación de stock y otros campos)
router.post('/', async (req, res) => {
  let { nombre, descripcion, precio, estado, imagen_url, stock } = req.body;

  try {
    // Convertir tipos correctamente
    precio = parseFloat(precio);
    stock = parseInt(stock);
    if (isNaN(stock)) stock = 1;
    if (!estado) estado = 'disponible';

    const result = await pool.query(
      `INSERT INTO habitaciones (nombre, descripcion, precio, estado, imagen_url, stock)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nombre, descripcion || '', precio, estado, imagen_url || '', stock]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear habitación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar habitación
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  let { nombre, descripcion, precio, estado, imagen_url, stock } = req.body;

  try {
    // Convertir tipos correctamente
    precio = parseFloat(precio);
    stock = parseInt(stock);
    if (isNaN(stock)) stock = 1;
    if (!estado) estado = 'disponible';

    const result = await pool.query(
      `UPDATE habitaciones
       SET nombre = $1, descripcion = $2, precio = $3, estado = $4, imagen_url = $5, stock = $6
       WHERE id = $7
       RETURNING *`,
      [nombre, descripcion || '', precio, estado, imagen_url || '', stock, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al actualizar habitación:', error);
    res.status(500).json({ error: 'Error al actualizar habitación' });
  }
});

// Eliminar habitación
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM habitaciones WHERE id=$1', [id]);
    res.json({ message: 'Habitación eliminada correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar habitación:', error);
    res.status(500).json({ error: 'Error al eliminar habitación' });
  }
});

module.exports = router;
