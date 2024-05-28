import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Importa el icono de flecha izquierda
import './CrearProducto.css';

const CrearProducto = () => {
  const [producto, setProducto] = useState({
    id: Math.floor(Math.random() * 1000) + 1,
    nombre: '',
    precio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/restaurante/productos/crear', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });
      const data = await response.json();
      // Manejar la respuesta del backend
    } catch (error) {
      console.error('Error al crear producto:', error);
      // Mostrar mensaje de error al usuario
    }
  };

  return (
    <div className="ProductoContainer">
      <div className="BackButtonContainer">
        <Link to="/admin" className="BackButton">
          <FiArrowLeft className="ArrowIcon" />
        </Link>
      </div>
      <h2>Crear Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="FormGroup">
          <label className="FormLabel">
            Nombre:
            <input className="FormInput" type="text" name="nombre" value={producto.nombre} onChange={handleChange} />
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Precio:
            <input className="FormInput" type="text" name="precio" value={producto.precio} onChange={handleChange} />
          </label>
        </div>
        <button className="FormButton GuardarUsuarioButton" type="submit">Guardar Producto</button>
      </form>
    </div>
  );
};

export default CrearProducto;