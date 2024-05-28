import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; 
import './EditarProducto.css';

const EditarProducto = () => {


  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: ''
  });

  // Función para cargar los datos del producto desde el backend
  const cargarProductos = async () => {
    try {
      const response = await fetch(`http://localhost:4000/restaurante/productos`);
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []); 

  const handleChangeProducto = (e) => {
    const { value } = e.target;
    setProductoSeleccionado(value);
  
    // Obtener los datos del producto seleccionado
    const productoSeleccionadoData = productos.find(prod => prod.id === value);
    if (productoSeleccionadoData) {
      setProducto(productoSeleccionadoData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
    console.log();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productoSeleccionado)

    const idParseado = parseInt(productoSeleccionado);

    const pedidoEditar = {
      nuevoNombre: producto.nombre, 
      nuevoPrecio: producto.precio,
      id: idParseado
    }

    console.log('pedidoEditar');
    console.log(pedidoEditar);

    try {
      const response = await fetch(`http://localhost:4000/restaurante/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoEditar),
      });
      const data = await response.json();
      // Manejar la respuesta del backend
    } catch (error) {
      console.error('Error al editar producto:', error);
      // Mostrar mensaje de error 
    }
  };
  

  return (
    <div className="ProductoContainer">
      <div className="BackButtonContainer">
        <Link to="/admin" className="BackButton">
          <FiArrowLeft className="ArrowIcon" />
        </Link>
      </div>
      <h2>Editar Producto</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="FormGroup">
          <label className="FormLabel">
            Producto:
            <select className="FormInput" value={productoSeleccionado} onChange={handleChangeProducto}>
              <option value="">Seleccionar Producto</option>
              {productos.map(prod => (
                <option key={prod.id} value={prod.id}>{prod.nombre}</option>
              ))}
            </select>
          </label>
        </div>
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

export default EditarProducto;
