import React from 'react';
import '../App.css'; // Puedes personalizar estilos aquí

function Inicio() {
  return (
    <div className="container mt-5">
      <section className="text-center mb-5">
        <h1 className="display-4 fw-bold">¡Bienvenidos a Hostería Campestre!</h1>
        <p className="lead">
          Tu espacio de descanso, aventura y conexión con la naturaleza.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-center text-success">Nuestros Servicios</h2>
        <p className="text-center">Disfruta de todo lo que ofrecemos</p>
        <div className="row">
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow">
              <img
                src="https://res.cloudinary.com/dpkvtc8he/image/upload/v1752627773/hospedaje_a81bwa.jpg"
                className="card-img-top"
                alt="Hospedaje"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-success">Hospedaje</h5>
                <p>Habitaciones cómodas y temáticas rodeadas de naturaleza.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow">
              <img
                src="https://res.cloudinary.com/dpkvtc8he/image/upload/v1752627773/piscina_actr6y.jpg"
                className="card-img-top"
                alt="Piscinas"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-success">Piscinas</h5>
                <p>Perfectas para relajarse bajo el sol, para adultos y niños.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow">
              <img
                src="https://res.cloudinary.com/dpkvtc8he/image/upload/v1752627773/eventos_jdycci.jpg"
                className="card-img-top"
                alt="Eventos"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-success">Eventos</h5>
                <p>Bodas, reuniones y fiestas especiales al aire libre.</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <div className="card h-100 shadow">
              <img
                src="https://res.cloudinary.com/dpkvtc8he/image/upload/v1752627773/restaurante_bqtwhn.jpg"
                className="card-img-top"
                alt="Restaurante"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-success">Restaurante</h5>
                <p>Gastronomía típica e internacional para todos los gustos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h3 className="text-center text-success">Ubicación</h3>
        <div className="ratio ratio-16x9">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3974.803933199064!2d-79.178214!3d-0.253658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902be6f4f3e6a4e3%3A0x2eecb4dbfbc2e5c9!2sHoster%C3%ADa%20Campestre!5e0!3m2!1ses-419!2sec!4v1699999999999"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa ubicación"
          ></iframe>
        </div>
      </section>

      <section className="text-center mb-5">
        <h5>¡Síguenos!</h5>
        <div className="d-flex justify-content-center gap-4 fs-2">
          <a href="https://wa.me/593990145380" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-whatsapp text-success"></i>
          </a>
          <a href="https://www.facebook.com/hosteriacampestre" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook text-primary"></i>
          </a>
          <a href="https://www.instagram.com/hosteriacampestre" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram text-danger"></i>
          </a>
        </div>
      </section>
    </div>
  );
}

export default Inicio;
