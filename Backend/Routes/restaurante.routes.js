const express = require('express');
const router = express.Router();
const restaurant = require('../controllers/restaurant.js');
const usuarios =require('../db/usuarios.json');
const productos = require('../db/productos.json');
const ventas = require('../db/ventas.json');
router
  .get('/usuarios', (req, res) => {
    try {
      res.status(200).json(usuarios.usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' })
    }
  })
  .get('/productos', (req, res) => {
        try {
          res.status(200).json(productos.productos); 
        } catch (error) {
          console.error('Error al obtener productos:', error);
          res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
      })

  
  
  .get('/ventasVer', restaurant.obtenerVentas)
  .post('/ventas', restaurant.agregarVenta)
  


  //Rutas para solicitudes de usuario
  .post('/login', restaurant.login)
  .post('/usuarios', restaurant.crearUsuario)
  .put('/usuarios/:id', restaurant.editarUsuario)
  .delete('/usuarios/:id', restaurant.eliminarUsuario)

  //Rutas para solicitudes de productos
  .get('/productos/:id', restaurant.obtenerProductos)
  .post('/productos/crear',restaurant.crearProducto)
  .post('/productos',restaurant.editarProducto)
  .delete('/productos/:id', restaurant.eliminarProducto)  

  //Rutas para solicitudes de pedidos
  .get('/pedidos', restaurant.obtenerPedidos)
  .post('/pedidos', restaurant.crearPedido)
  .patch('/pedidos/:id', restaurant.editarEstadoPedido);


  

module.exports = router;