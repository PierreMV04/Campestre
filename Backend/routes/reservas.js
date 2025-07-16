const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservas ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// ✅ Crear nueva reserva
router.post('/', async (req, res) => {
  console.log("📥 Datos recibidos en reserva:", req.body);
  const { cliente, habitacion_id, fecha_entrada, fecha_salida, estado } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO reservas (cliente, habitacion_id, fecha_entrada, fecha_salida, estado)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [cliente, habitacion_id, fecha_entrada, fecha_salida, estado || 'confirmada']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear reserva:', error);
    res.status(500).json({ error: 'Error al crear reserva' });
  }
});

// ✅ Anular (cancelar) una reserva
router.post('/anular/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'UPDATE reservas SET estado = $1 WHERE id = $2 RETURNING *',
      ['anulada', id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al anular reserva:', error);
    res.status(500).json({ error: 'Error al anular reserva' });
  }
});

// ✅ Actualizar fechas de una reserva
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { fecha_entrada, fecha_salida } = req.body;

  try {
    const result = await pool.query(
      `UPDATE reservas
       SET fecha_entrada = $1, fecha_salida = $2
       WHERE id = $3
       RETURNING *`,
      [fecha_entrada, fecha_salida, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al actualizar fechas de reserva:', error);
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
});

module.exports = router;
