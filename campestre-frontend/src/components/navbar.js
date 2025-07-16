import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

function Navbar() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" height="50" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center gap-2">
            {/* Si es cliente, mostrar las páginas */}
            {usuario?.rol === 'cliente' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/habitaciones">Habitaciones</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reservas">Reservas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contacto">Contacto</Link>
                </li>
              </>
            )}

            {/* Si es admin, solo muestra Admin */}
            {usuario?.rol === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Admin</Link>
              </li>
            )}

            {/* Si NO hay usuario logueado */}
            {!usuario && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-outline-dark me-2">Iniciar sesión</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="btn btn-outline-dark">Registrarse</Link>
                </li>
              </>
            )}

            {/* Si hay usuario logueado */}
            {usuario && (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-danger">Cerrar sesión</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
