import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Ventas.css';

const TotalVentas = () => {
  const [ventasPorMesero, setVentasPorMesero] = useState({});

  const obtenerVentas = async () => {
    try {
      const response = await fetch('http://localhost:4000/restaurante/ventasVer', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error al cargar las ventas: ' + response.statusText);
      }
      const data = await response.json();
      setVentasPorMesero(data);
    } catch (error) {
      console.error('Error al obtener las ventas:', error);
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  return (
    <div className="total-ventas-container">
      {/* Botón de regreso */}
      <Link to="/admin">
        <button className="back-button">
          <i className="fas fa-arrow-left"></i> Volver
        </button>
      </Link>
      
      <h2>Total de Ventas</h2>
      {/* Contenido de ventas */}
      {Object.entries(ventasPorMesero).map(([mesero, datos]) => (
        <div key={mesero} className="mesero-container">
          <div className="mesero-header">{mesero}</div>
          <p className="total-ventas">Total Ventas: {datos.totalVentas}</p>
          <table className="ventas-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Ventas</th>
              </tr>
            </thead>
            <tbody>
              {datos.ventas.map((venta, index) => (
                <tr key={index}>
                  <td>{venta.producto}</td>
                  <td>{venta.totalVentas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TotalVentas;
