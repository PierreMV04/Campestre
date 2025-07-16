import React, { useEffect, useState } from 'react';
import api from '../api/Api';
import './reservas.css';

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [nuevaReserva, setNuevaReserva] = useState({
    cliente: '',
    id_habitacion: '',
    fecha_entrada: '',
    fecha_salida: ''
  });

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const nombreUsuario = usuario?.nombre;

  // Cargar reservas y habitaciones al iniciar
  useEffect(() => {
    cargarReservas();
    cargarHabitaciones();
  }, []);

  const cargarReservas = async () => {
    try {
      const res = await api.getReservas();
      setReservas(res.data);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    }
  };

  const cargarHabitaciones = async () => {
    try {
      const res = await api.getHabitaciones();
      setHabitaciones(res.data);
    } catch (error) {
      console.error('Error al cargar habitaciones:', error);
    }
  };

  const handleChange = (e) => {
    setNuevaReserva({ ...nuevaReserva, [e.target.name]: e.target.value });
  };

  const handleReserva = async (e) => {
    e.preventDefault();

    const datos = {
      ...nuevaReserva,
      cliente: nombreUsuario || nuevaReserva.cliente, // Usa el nombre del usuario logueado si existe
      estado: 'pendiente'
    };

    try {
      await api.crearReserva(datos);
      alert('✅ Reserva registrada exitosamente');
      setNuevaReserva({
        cliente: '',
        id_habitacion: '',
        fecha_entrada: '',
        fecha_salida: ''
      });
      cargarReservas();
      cargarHabitaciones();
    } catch (err) {
      console.error('Error al registrar reserva:', err);
      alert('❌ No se pudo registrar la reserva');
    }
  };

  const anularReserva = async (id) => {
    try {
      await api.anularReserva(id);
      alert('✅ Reserva anulada correctamente');
      cargarReservas();
      cargarHabitaciones();
    } catch (err) {
      console.error('Error al anular reserva:', err);
      alert('❌ No se pudo anular la reserva');
    }
  };

  const reservasFiltradas = reservas.filter(r => r.cliente === nombreUsuario);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Reservas</h2>

      <h4>Habitaciones Disponibles</h4>
      <table className="table table-bordered mb-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((hab) => (
            <tr key={hab.id}>
              <td>{hab.id}</td>
              <td>{hab.nombre}</td>
              <td style={{ color: hab.stock === 0 ? 'red' : 'green' }}>{hab.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleReserva} className="mb-4">
        <div className="row">
          {!nombreUsuario && (
            <div className="col-md-3">
              <input
                type="text"
                name="cliente"
                className="form-control"
                placeholder="Tu nombre"
                value={nuevaReserva.cliente}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="col-md-3">
            <select
              name="id_habitacion"
              className="form-control"
              value={nuevaReserva.id_habitacion}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una habitación</option>
              {habitaciones.map((hab) => (
                <option key={hab.id} value={hab.id} disabled={hab.stock === 0}>
                  {hab.nombre} (ID: {hab.id}) - Stock: {hab.stock}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="fecha_entrada"
              className="form-control"
              value={nuevaReserva.fecha_entrada}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="fecha_salida"
              className="form-control"
              value={nuevaReserva.fecha_salida}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">
              Reservar
            </button>
          </div>
        </div>
      </form>

      <h4>Mis Reservas</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Habitación</th>
            <th>Entrada</th>
            <th>Salida</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {reservasFiltradas.map((res) => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.cliente}</td>
              <td>{res.nombre_habitacion || res.id_habitacion}</td>
              <td>{res.fecha_entrada?.split('T')[0]}</td>
              <td>{res.fecha_salida?.split('T')[0]}</td>
              <td className={res.estado === 'anulada' ? 'text-danger' : 'text-success'}>
                {res.estado}
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => anularReserva(res.id)}
                  disabled={res.estado === 'anulada'}
                >
                  Anular
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservas;
