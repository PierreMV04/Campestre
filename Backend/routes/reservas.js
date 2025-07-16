const express = require('express');
const router = express.Router();
const pool = require('../db');

console.log("🟢 Usando archivo:", __filename);

// ✅ Obtener todas las reservas (con nombre de habitación)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.*, h.nombre AS nombre_habitacion
      FROM reservas r
      JOIN habitaciones h ON r.habitacion_id = h.id
      ORDER BY r.id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener reservas:', error);
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
});

// ✅ Crear nueva reserva (con validación de fechas)
router.post('/', async (req, res) => {
  console.log("📥 Datos recibidos en reserva:", req.body);
  const { cliente, habitacion_id, fecha_entrada, fecha_salida, estado } = req.body;

  try {
    // Validar fechas
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Ignorar hora

    const entrada = new Date(fecha_entrada);
    const salida = new Date(fecha_salida);

    if (entrada < hoy) {
      return res.status(400).json({ error: 'La fecha de entrada no puede ser menor a hoy.' });
    }

    if (salida < entrada) {
      return res.status(400).json({ error: 'La fecha de salida no puede ser menor a la de entrada.' });
    }

    // Verificar stock
    const stockRes = await pool.query(
      'SELECT stock FROM habitaciones WHERE id = $1',
      [habitacion_id]
    );

    if (stockRes.rows.length === 0) {
      return res.status(404).json({ error: 'Habitación no encontrada' });
    }

    const stock = stockRes.rows[0].stock;
    if (stock <= 0) {
      return res.status(400).json({ error: 'No hay disponibilidad para esta habitación' });
    }

    // Crear reserva
    const reserva = await pool.query(
      `INSERT INTO reservas (cliente, habitacion_id, fecha_entrada, fecha_salida, estado)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [cliente, habitacion_id, fecha_entrada, fecha_salida, estado || 'confirmada']
    );

    // Bajar stock
    await pool.query(
      `UPDATE habitaciones SET stock = stock - 1 WHERE id = $1`,
      [habitacion_id]
    );

    res.status(201).json(reserva.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear reserva:', error);
    res.status(500).json({ error: 'Error al crear reserva' });
  }
});


// ✅ Anular reserva (y subir stock)
router.post('/anular/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener la reserva para saber qué habitación es
    const reserva = await pool.query(
      'SELECT * FROM reservas WHERE id = $1',
      [id]
    );

    if (reserva.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    const habitacion_id = reserva.rows[0].habitacion_id;

    // Anular reserva
    const result = await pool.query(
      'UPDATE reservas SET estado = $1 WHERE id = $2 RETURNING *',
      ['anulada', id]
    );

    // Subir stock
    await pool.query(
      'UPDATE habitaciones SET stock = stock + 1 WHERE id = $1',
      [habitacion_id]
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
