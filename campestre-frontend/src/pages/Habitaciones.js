import React, { useEffect, useState } from 'react';
import api from '../api/Api';
import './Habitaciones.css'; // estilos opcionales
import { Link } from 'react-router-dom';

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    api.getHabitaciones()
      .then(res => setHabitaciones(res.data))
      .catch(err => console.error('Error al cargar habitaciones:', err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Habitaciones disponibles</h2>

      <div className="row">
        {habitaciones.map((habitacion) => (
          <div key={habitacion.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={habitacion.imagen_url}
                alt={habitacion.nombre}
                className="card-img-top"
                style={{ height: '220px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{habitacion.nombre}</h5>
                <p className="card-text">{habitacion.descripcion || 'Sin descripción disponible.'}</p>
                <p><strong>Precio:</strong> ${parseFloat(habitacion.precio).toFixed(2)}</p>
                <p>
                  <strong>Disponibilidad:</strong>{' '}
                  {habitacion.stock > 0 ? (
                    <span className="text-success">{habitacion.stock} disponibles</span>
                  ) : (
                    <span className="text-danger">Sin stock</span>
                  )}
                </p>
              </div>
              <div className="card-footer text-center bg-white border-top-0">
                <Link to="/reservas">
                  <button
                    className="btn btn-primary w-100"
                    disabled={habitacion.stock === 0}
                  >
                    Reservar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Habitaciones;
