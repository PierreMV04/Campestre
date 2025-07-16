import React, { useState } from 'react';
import api from '../api/Api'; // Asegúrate de tener esta importación

function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.enviarContacto(formulario); // <-- Enviamos al backend
      setEnviado(true);
      setFormulario({ nombre: '', correo: '', asunto: '', mensaje: '' });
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      alert('Ocurrió un error al enviar el mensaje. Intenta más tarde.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Contacto</h2>
      <p>¿Tienes alguna duda o comentario? ¡Contáctanos!</p>
      {enviado && <div className="alert alert-success">Mensaje enviado correctamente</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={formulario.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Asunto</label>
          <input
            type="text"
            className="form-control"
            name="asunto"
            value={formulario.asunto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mensaje</label>
          <textarea
            className="form-control"
            name="mensaje"
            rows="5"
            value={formulario.mensaje}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;
