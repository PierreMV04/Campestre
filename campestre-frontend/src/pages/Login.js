import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/Api';

function Login() {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.loginUsuario({ correo, clave });
      const usuario = res.data;
      localStorage.setItem('usuario', JSON.stringify(usuario));

      if (usuario.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error de login:', error);
      alert('Credenciales incorrectas o usuario no registrado');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Iniciar sesión</h3>
      <div className="mb-3">
        <label>Correo:</label>
        <input type="text" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Contraseña:</label>
        <input type="password" className="form-control" value={clave} onChange={(e) => setClave(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}

export default Login;
