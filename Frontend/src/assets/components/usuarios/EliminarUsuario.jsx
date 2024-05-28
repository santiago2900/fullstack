import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './EliminarUsuario.css';

const EliminarUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    // Aquí realizar la llamada para obtener la lista de usuarios desde el backend
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:4000/restaurante/usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };
    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert('Por favor selecciona un usuario');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/restaurante/usuarios/${selectedUser}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }
      // Eliminar el usuario del estado local después de la eliminación
      setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario.id !== selectedUser));
      setSelectedUser('');
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario. Por favor, inténtalo de nuevo.');
    }
  };

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  return (
    <div className="FormContainer">
      <div className="BackButtonContainer">
        <Link to="/admin" className="BackButton">
          <FiArrowLeft className="ArrowIcon" />
        </Link>
      </div>
      <h2>Eliminar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="FormGroup">
          <label className="FormLabel">
            Usuario:
            <select className="FormSelect" value={selectedUser} onChange={handleUserSelect}>
              <option value="">Seleccionar usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>{usuario.username}</option>
              ))}
            </select>
          </label>
        </div>
        <button className="FormButton" type="submit">Eliminar Usuario</button>
      </form>
    </div>
  );
};

export default EliminarUsuario;
