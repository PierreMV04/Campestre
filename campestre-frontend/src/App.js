import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Inicio from './pages/Inicio';
import Habitaciones from './pages/Habitaciones';
import Reservas from './pages/Reservas';
import Contacto from './pages/Contacto';
import Admin from './pages/Admin';
import Carrito from './pages/Carrito';
import Register from './pages/Register';
import Login from './pages/Login'; // ✅ Esta es la corrección

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/habitaciones" element={<Habitaciones />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Aquí también agregas */}
      </Routes>
    </Router>
  );
}

export default App;
