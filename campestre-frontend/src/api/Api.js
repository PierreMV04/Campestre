import axios from 'axios';

const API_BASE = axios.create({
  baseURL: 'https://campestre-production.up.railway.app/api'
});


// 🔹 Habitaciones
const getHabitaciones = () => API_BASE.get('/habitaciones');

const crearHabitacion = ({ nombre, descripcion, precio, stock, estado, imagen_url }) =>
  API_BASE.post('/habitaciones', {
    nombre,
    descripcion,
    precio,
    stock,
    estado,
    imagen_url,
  });

const actualizarHabitacion = (id, { nombre, descripcion, precio, stock, estado, imagen_url }) =>
  API_BASE.put(`/habitaciones/${id}`, {
    nombre,
    descripcion,
    precio,
    stock,
    estado,
    imagen_url,
  });

const eliminarHabitacion = (id) => API_BASE.delete(`/habitaciones/${id}`);

// 🔹 Reservas
const getReservas = () => API_BASE.get('/reservas');
const crearReserva = (reserva) => API_BASE.post('/reservas', reserva);
const anularReserva = (id) => API_BASE.post(`/reservas/anular/${id}`);
const actualizarReserva = (id, datos) => API_BASE.put(`/reservas/${id}`, datos);

// 🔹 Contacto
const enviarContacto = (mensaje) => API_BASE.post('/contacto', mensaje);
const getMensajesContacto = () => API_BASE.get('/contacto');

// 🔹 Usuarios
const getUsuarios = () => API_BASE.get('/usuarios');
const actualizarUsuario = (id, datos) => API_BASE.put(`/usuarios/${id}`, datos);
const crearUsuario = (datos) => API_BASE.post('/usuarios', datos);
const loginUsuario = (datos) => API_BASE.post('/auth/login', datos);

const api = {
  getHabitaciones,
  crearHabitacion,
  actualizarHabitacion,
  eliminarHabitacion,

  getReservas,
  crearReserva,
  anularReserva,
  actualizarReserva,

  enviarContacto,
  getMensajesContacto,

  getUsuarios,
  actualizarUsuario,
  crearUsuario,
  loginUsuario,
};

export default api;
