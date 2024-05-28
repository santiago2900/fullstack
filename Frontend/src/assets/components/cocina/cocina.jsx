import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cocina.css';


const Cocina = () => {
  const [pedidos, setPedidos] = useState([]);
  const goTo = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:4000/restaurante/pedidos');
        if (!response.ok) {
          throw new Error('Error al cargar los pedidos: ' + response.statusText);
        }
        const data = await response.json();
        setPedidos(data.filter(pedido => pedido.estado === 'procesando'));
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };

    fetchPedidos();
  }, []);

  const handleMarcarComoListo = async (id) => {
    try {
        const response = await fetch(`http://localhost:4000/restaurante/pedidos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: 'listo' }),
        });

        if (!response.ok) {
            throw new Error('Error al marcar el pedido como listo');
        }

        const pedidoListo = pedidos.find(pedido => pedido.id === id);

        const ventaResponse = await fetch('http://localhost:4000/restaurante/ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mesero: pedidoListo.mesero,
                producto: pedidoListo.productos.map(producto => producto.nombre).join(', '), // Concatenar los nombres de los productos
                totalVentas: pedidoListo.total
            }),
        });

        if (!ventaResponse.ok) {
            throw new Error('Error al agregar la venta a la base de datos de ventas');
        }

        
        setPedidos(pedidos.filter(pedido => pedido.id !== id));        
        
    } catch (error) {
        console.error('Error al marcar el pedido como listo:', error);
    }
};

  const handleLogout = () => {
    
    localStorage.removeItem('nameUser');
    
    goTo('/');
  };

  return (
    <div className="cocina-background">
    <div className="CocinaContainer">
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      <h2>Pedidos en Cocina</h2>
      <div className="PedidosContainer">
        {pedidos.map(pedido => (
          <div key={pedido.id} className="PedidoItem">
            <h3>Mesa: {pedido.mesa}</h3>
            <p>Mesero: {pedido.mesero}</p>
            <ul>
              {pedido.productos.map((producto, index) => (
                <li key={index}>
                  {producto.cantidad}x {producto.nombre}
                </li>
              ))}
            </ul>
            <p>Total: ${pedido.total}</p>
            <button onClick={() => handleMarcarComoListo(pedido.id)}>Marcar como listo</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Cocina;
