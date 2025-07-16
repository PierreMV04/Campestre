require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Rutas importadas
const authRoutes = require('./routes/auth');
const habitacionesRoutes = require('./routes/habitaciones');
const reservasRoutes = require('./routes/reservas');
const contactoRoutes = require('./routes/contacto'); // ✅ Solo una vez
const usuariosRoutes = require('./routes/usuarios'); // ✅ Solo una vez


// Middlewares
app.use(cors());
app.use(express.json());

// Definición de rutas
app.use('/api/auth', authRoutes);
app.use('/api/habitaciones', habitacionesRoutes);
app.use('/api/reservas', reservasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/contacto', contactoRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});
