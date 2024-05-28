import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './CrearUsuario.css';

const CrearUsuario = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('admin'); // Valor inicial

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí enviar los datos al backend y manejar la respuesta
    try {
      const response = await fetch('http://localhost:4000/restaurante/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, rol }),
      });
      const data = await response.json();
      setUsername('');
      setPassword('');
      setRol('admin'); 


      // Manejar la respuesta del backend
    } catch (error) {
      console.error('Error al crear usuario:', error);
      // Mostrar mensaje de error al usuario
    }
  };

  return (
    <div className="FormContainer">
      <div className="BackButtonContainer">
        <Link to="/admin" className="BackButton">
          <FiArrowLeft className="ArrowIcon" />
        </Link>
      </div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="FormGroup">
          <label className="FormLabel">
            Nombre:
            <input className="FormInput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Contraseña:
            <input className="FormInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Rol:
            <select className="FormSelect" value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="mesero">Mesero</option>
              <option value="cocina">Cocina</option>
            </select>
          </label>
        </div>
        <button className="FormButton GuardarUsuarioButton" type="submit">Guardar Usuario</button>

      </form>
    </div>
  );
};

export default CrearUsuario;
