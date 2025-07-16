import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

// 🔹 Habitaciones
const getHabitaciones = () => axios.get(`${API_BASE}/habitaciones`);

const crearHabitacion = ({ nombre, descripcion, precio, stock, estado, imagen_url }) =>
  axios.post(`${API_BASE}/habitaciones`, {
    nombre,
    descripcion,
    precio,
    stock,
    estado,
    imagen_url,
  });

const actualizarHabitacion = (id, { nombre, descripcion, precio, stock, estado, imagen_url }) =>
  axios.put(`${API_BASE}/habitaciones/${id}`, {
    nombre,
    descripcion,
    precio,
    stock,
    estado,
    imagen_url,
  });

const eliminarHabitacion = (id) => axios.delete(`${API_BASE}/habitaciones/${id}`);

// 🔹 Reservas
const getReservas = () => axios.get(`${API_BASE}/reservas`);
const crearReserva = (reserva) => axios.post(`${API_BASE}/reservas`, reserva);
const anularReserva = (id) => axios.post(`${API_BASE}/reservas/anular/${id}`);
const actualizarReserva = (id, datos) => axios.put(`${API_BASE}/reservas/${id}`, datos);

// 🔹 Contacto
const enviarContacto = (mensaje) => axios.post(`${API_BASE}/contacto`, mensaje);
const getMensajesContacto = () => axios.get(`${API_BASE}/contacto`);

// 🔹 Usuarios
const getUsuarios = () => axios.get(`${API_BASE}/usuarios`);
const actualizarUsuario = (id, datos) => axios.put(`${API_BASE}/usuarios/${id}`, datos);
const crearUsuario = (datos) => axios.post(`${API_BASE}/usuarios`, datos);
const loginUsuario = (datos) => axios.post(`${API_BASE}/auth/login`, datos);

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
  loginUsuario, // ✅ Agregado correctamente
};

export default api;
