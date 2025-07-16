// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/Api';

function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nombre || !correo || !clave) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await api.crearUsuario({ nombre, correo, clave });
      alert('Usuario registrado exitosamente');
      navigate('/login');
    } catch (error) {
      console.error('❌ Error al registrar usuario:', error);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Registro de Usuario</h3>

      <div className="mb-3">
        <label>Nombre:</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Correo:</label>
        <input
          type="email"
          className="form-control"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Contraseña:</label>
        <input
          type="password"
          className="form-control"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={handleRegister}>
        Registrarse
      </button>
    </div>
  );
}

export default Register;
