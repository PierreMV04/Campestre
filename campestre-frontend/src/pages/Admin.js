import React, { useState, useEffect } from 'react';
import api from '../api/Api';
import './Admin.css';

function Admin() {
  const [reservas, setReservas] = useState([]);
  const [reservaEditando, setReservaEditando] = useState(null);
  const [fechaEntradaEdit, setFechaEntradaEdit] = useState('');
  const [fechaSalidaEdit, setFechaSalidaEdit] = useState('');

  const [habitaciones, setHabitaciones] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [seccion, setSeccion] = useState('reservas');
  const [nueva, setNueva] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    estado: 'disponible',
    imagen_url: '',
    stock: ''
  });

  useEffect(() => {
    cargarTodo();
  }, []);

  const cargarTodo = () => {
    api.getReservas().then(res => setReservas(res.data));
    api.getHabitaciones().then(res => setHabitaciones(res.data));
    api.getMensajesContacto().then(res => setMensajes(res.data));
    api.getUsuarios().then(res => setUsuarios(res.data));
  };

  const handleAnular = (id) => {
    api.anularReserva(id).then(() => {
      setReservas(reservas.map(r => r.id === id ? { ...r, estado: 'anulada' } : r));
    });
  };

  return (
    <div className="admin-panel container mt-4">
      <h3 className="text-center mb-4">Panel de Administración</h3>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button onClick={() => setSeccion('reservas')} className={`btn ${seccion === 'reservas' ? 'btn-primary' : 'btn-outline-primary'}`}>Reservas</button>
        <button onClick={() => setSeccion('habitaciones')} className={`btn ${seccion === 'habitaciones' ? 'btn-primary' : 'btn-outline-primary'}`}>Habitaciones</button>
        <button onClick={() => setSeccion('contacto')} className={`btn ${seccion === 'contacto' ? 'btn-primary' : 'btn-outline-primary'}`}>Mensajes de Contacto</button>
        <button onClick={() => setSeccion('usuarios')} className={`btn ${seccion === 'usuarios' ? 'btn-primary' : 'btn-outline-primary'}`}>Usuarios</button>
      </div>

      {/* === SECCIÓN RESERVAS === */}
      {seccion === 'reservas' && (
        <div>
          <h5>Reservas</h5>
          <div className="table-responsive">
            <table className="table table-sm table-bordered">
              <thead className="table-light">
                <tr><th>ID</th><th>Cliente</th><th>Habitación</th><th>Entrada</th><th>Salida</th><th>Estado</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {reservas.map(r => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.cliente}</td>
                    <td>{r.habitacion}</td>
                    <td>{r.fecha_entrada.slice(0, 10)}</td>
                    <td>{r.fecha_salida.slice(0, 10)}</td>
                    <td>{r.estado || 'confirmada'}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2" onClick={() => {
                        setReservaEditando(r);
                        setFechaEntradaEdit(r.fecha_entrada.slice(0, 10));
                        setFechaSalidaEdit(r.fecha_salida.slice(0, 10));
                      }}>Editar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => handleAnular(r.id)} disabled={r.estado === 'anulada'}>
                        Anular
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal para editar reserva */}
          {reservaEditando && (
            <div className="modal d-block bg-dark bg-opacity-50">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Editar fechas de reserva</h5>
                    <button className="btn-close" onClick={() => setReservaEditando(null)}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label>Fecha de entrada:</label>
                      <input
                        type="date"
                        className="form-control"
                        value={fechaEntradaEdit}
                        onChange={(e) => setFechaEntradaEdit(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label>Fecha de salida:</label>
                      <input
                        type="date"
                        className="form-control"
                        value={fechaSalidaEdit}
                        onChange={(e) => setFechaSalidaEdit(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setReservaEditando(null)}>Cancelar</button>
                    <button className="btn btn-primary" onClick={() => {
                      if (fechaEntradaEdit > fechaSalidaEdit) {
                        alert("La fecha de entrada no puede ser mayor a la de salida");
                        return;
                      }

                      api.actualizarReserva(reservaEditando.id, {
                        fecha_entrada: fechaEntradaEdit,
                        fecha_salida: fechaSalidaEdit
                      }).then(() => {
                        setReservaEditando(null);
                        cargarTodo();
                      });
                    }}>Guardar cambios</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === SECCIÓN HABITACIONES === */}
      {seccion === 'habitaciones' && (
        <div>
          <h5>Gestión de Habitaciones</h5>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!nueva.nombre || !nueva.precio || !nueva.stock || !nueva.imagen_url) return;

              api.crearHabitacion(nueva).then(() => {
                cargarTodo();
                setNueva({
                  nombre: '',
                  descripcion: '',
                  precio: '',
                  estado: 'disponible',
                  imagen_url: '',
                  stock: ''
                });
              });
            }}
            className="row g-2 mb-3"
          >
            <div className="col-sm-2">
              <input type="text" className="form-control" placeholder="Nombre" value={nueva.nombre}
                onChange={(e) => setNueva({ ...nueva, nombre: e.target.value })} required />
            </div>
            <div className="col-sm-2">
              <input type="text" className="form-control" placeholder="Descripción" value={nueva.descripcion}
                onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })} />
            </div>
            <div className="col-sm-2">
              <input type="number" className="form-control" placeholder="Precio" value={nueva.precio}
                onChange={(e) => setNueva({ ...nueva, precio: parseFloat(e.target.value) })} required />
            </div>
            <div className="col-sm-2">
              <input type="number" className="form-control" placeholder="Stock" value={nueva.stock}
                onChange={(e) => setNueva({ ...nueva, stock: parseInt(e.target.value) })} required />
            </div>
            <div className="col-sm-3">
              <input type="text" className="form-control" placeholder="URL Imagen Cloudinary" value={nueva.imagen_url}
                onChange={(e) => setNueva({ ...nueva, imagen_url: e.target.value })} required />
            </div>
            <div className="col-sm-1">
              <button className="btn btn-success w-100">+</button>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-sm table-bordered">
              <thead className="table-light">
                <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Stock</th><th>Imagen</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {habitaciones.map(h => (
                  <tr key={h.id}>
                    <td>{h.id}</td>
                    <td>{h.nombre}</td>
                    <td>{h.descripcion}</td>
                    <td>${parseFloat(h.precio).toFixed(2)}</td>
                    <td>{h.stock}</td>
                    <td><a href={h.imagen_url} target="_blank" rel="noopener noreferrer">Ver imagen</a></td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => {
                        const nuevoNombre = prompt('Nuevo nombre:', h.nombre);
                        const nuevaDesc = prompt('Nueva descripción:', h.descripcion || '');
                        const nuevoPrecio = prompt('Nuevo precio:', h.precio);
                        const nuevoStock = prompt('Nuevo stock:', h.stock);
                        const nuevaImg = prompt('Nueva imagen URL:', h.imagen_url);
                        if (nuevoNombre && nuevoPrecio && nuevoStock && nuevaImg) {
                          api.actualizarHabitacion(h.id, {
                            nombre: nuevoNombre,
                            descripcion: nuevaDesc,
                            precio: parseFloat(nuevoPrecio),
                            stock: parseInt(nuevoStock),
                            imagen_url: nuevaImg,
                            estado: h.estado || 'disponible'
                          }).then(() => cargarTodo());
                        }
                      }}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => {
                        if (window.confirm('¿Eliminar habitación?')) {
                          api.eliminarHabitacion(h.id).then(() => cargarTodo());
                        }
                      }}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* === SECCIÓN CONTACTO === */}
      {seccion === 'contacto' && (
        <div>
          <h5>Mensajes de Contacto</h5>
          <ul className="list-group list-group-flush">
            {mensajes.map(m => (
              <li key={m.id} className="list-group-item">
                <strong>{m.nombre}</strong> ({m.correo})<br />
                <strong>{m.asunto}</strong>: {m.mensaje}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* === SECCIÓN USUARIOS === */}
      {seccion === 'usuarios' && (
        <div>
          <h5>Usuarios Registrados</h5>
          <div className="table-responsive">
            <table className="table table-sm table-bordered">
              <thead className="table-light">
                <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th></tr>
              </thead>
              <tbody>
                {usuarios.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.nombre}</td>
                    <td>{u.correo}</td>
                    <td>{u.rol || 'cliente'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
