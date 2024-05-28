const fs = require('fs/promises');
const path = require('path');

const login = async (req, res) => {
    try {
        const usuariosFile = await fs.readFile(path.join(__dirname, '../db/usuarios.json'));

        const usuariosData = JSON.parse(usuariosFile);
        const { username, password } = req.body;

        // Buscar el usuario en la lista de usuarios
        const usuario = usuariosData.usuarios.find(user => user.username === username);
        console.log('usuario');
        console.log(usuario);


        if (!usuario) {
            return res.status(401).json({ mensaje: "Usuario Incorrecto" });
        }

        // Verificar la contraseña
        if (usuario.password !== password) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Autenticación exitosa
        res.status(200).json({ mensaje: "Autenticación exitosa", usuario, rol: usuario.rol });

    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }

    
};


const crearUsuario = async (req, res) => {
    try {
      const { username, rol, password } = req.body;
  
      
      const usuariosFile = await fs.readFile(path.join(__dirname, '../db/usuarios.json'), 'utf8');
      const usuariosData = JSON.parse(usuariosFile);
  
      
      const nuevoId = usuariosData.usuarios.length + 1;
  
      
      const nuevoUsuario = {
        id: nuevoId,
        username,
        rol,
        password
      };
  
    
      usuariosData.usuarios.push(nuevoUsuario);
  
      // Escribir el objeto actualizado de nuevo en el archivo usuarios.json
      await fs.writeFile(path.join(__dirname, '../db/usuarios.json'), JSON.stringify(usuariosData, null, 2));
  
      
      res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };

  const editarUsuario = async (req, res) => {
    const { id } = req.params; 
    try {
      const { newUsername, newPassword, newRol } = req.body; // Solo capturas los nuevos datos del usuario
  
      // Leer el archivo de usuarios
      const usuariosFile = await fs.readFile(path.join(__dirname, '../db/usuarios.json'), 'utf8');
      const usuariosData = JSON.parse(usuariosFile);
  
      // Buscar el usuario que se va a editar por su id
      const usuarioIndex = usuariosData.usuarios.findIndex(user => user.id === parseInt(id)); // Convertir id a entero
  
      // Verificar si el usuario existe
      if (usuarioIndex === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
  
      // Actualizar los datos del usuario
      usuariosData.usuarios[usuarioIndex].username = newUsername;
      usuariosData.usuarios[usuarioIndex].password = newPassword;
      usuariosData.usuarios[usuarioIndex].rol = newRol;
  
      // Escribir los datos actualizados en el archivo
      await fs.writeFile(path.join(__dirname, '../db/usuarios.json'), JSON.stringify(usuariosData, null, 2));
  
      // Responder con un mensaje de éxito y los datos del usuario editado
      res.status(200).json({ mensaje: "Usuario editado exitosamente", usuario: usuariosData.usuarios[usuarioIndex] });
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };


  const eliminarUsuario = async (req, res) => {
    const { id } = req.params; // Capturar el ID del usuario de los parámetros de la ruta
    try {
      
      const usuariosFile = await fs.readFile(path.join(__dirname, '../db/usuarios.json'), 'utf8');
      const usuariosData = JSON.parse(usuariosFile);
  
      
      const usuarioIndex = usuariosData.usuarios.findIndex(user => user.id === parseInt(id));
  
      
      if (usuarioIndex === -1) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
  
      
      usuariosData.usuarios.splice(usuarioIndex, 1);
  
      
      await fs.writeFile(path.join(__dirname, '../db/usuarios.json'), JSON.stringify(usuariosData, null, 2));
  
      
      res.status(200).json({ mensaje: "Usuario eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };
  
const obtenerProductos = async (req, res) => {
    try {
        const productosFile = await fs.readFile(path.join(__dirname, '../db/productos.json'));
        const productosData = JSON.parse(productosFile);
        res.json(productosData);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};


const crearProducto = async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, precio } = req.body;

    // Leer el archivo de productos existente
    const productosFile = await fs.readFile(path.join(__dirname, '../db/productos.json'), 'utf8');
    const productosData = JSON.parse(productosFile);

    // Generar un nuevo ID para el producto
    const nuevoId = productosData.productos.length + 1;

    // Crear el nuevo objeto de producto
    const nuevoProducto = {
      id: nuevoId,
      nombre,
      precio
    };

    // Agregar el nuevo producto a la lista de productos
    productosData.productos.push(nuevoProducto);

    // Escribir la lista actualizada de productos en el archivo
    await fs.writeFile(path.join(__dirname, '../db/productos.json'), JSON.stringify(productosData, null, 2));

    // Responder con el nuevo producto creado
    res.status(201).json({ mensaje: "Producto creado exitosamente", producto: nuevoProducto });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};


const editarProducto = async (req, res) => {
  console.log(req.body)
    try {
        const { id, nuevoNombre, nuevoPrecio } = req.body;

        
        const productosFile = await fs.readFile(path.join(__dirname, '../db/productos.json'), 'utf8');
        const productosData = JSON.parse(productosFile);

        
        const productoIndex = productosData.productos.findIndex(prod => prod.id === id);

        
        if (productoIndex === -1) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        
        productosData.productos[productoIndex].nombre = nuevoNombre;
        productosData.productos[productoIndex].precio = nuevoPrecio;

        
        await fs.writeFile(path.join(__dirname, '../db/productos.json'), JSON.stringify(productosData, null, 2));

        
        res.status(200).json({ mensaje: "Producto editado exitosamente", producto: productosData.productos[productoIndex] });
    } catch (error) {
        console.error("Error al editar el producto:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }

    
};

const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const productosFile = await fs.readFile(path.join(__dirname, '../db/productos.json'), 'utf8');
    let productosData = JSON.parse(productosFile);
    const productoIndex = productosData.productos.findIndex(prod => prod.id === parseInt(id));
    if (productoIndex === -1) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    // Eliminar el producto del array
    productosData.productos.splice(productoIndex, 1);
    await fs.writeFile(path.join(__dirname, '../db/productos.json'), JSON.stringify(productosData, null, 2));
    res.status(200).json({ mensaje: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

  
  

  const crearPedido = async (req, res) => {
    console.log(req.body);
    try {
        const nuevoPedido = req.body; // El cuerpo de la solicitud debe contener la información del pedido
        const pedidosFile = await fs.readFile(path.join(__dirname, '../db/pedidos.json'));
        const pedidosData = JSON.parse(pedidosFile);
        const nuevoId = pedidosData.length + 1;
        nuevoPedido.id = nuevoId;
        pedidosData.push(nuevoPedido);
        await fs.writeFile(path.join(__dirname, '../db/pedidos.json'), JSON.stringify(pedidosData, null, 2));
        res.status(201).json({ mensaje: "Pedido creado exitosamente", pedido: nuevoPedido });
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

const obtenerPedidos = async (req, res) => {
  try {
    const pedidosFile = await fs.readFile(path.join(__dirname, '../db/pedidos.json'));
    const pedidosData = JSON.parse(pedidosFile);
    res.json(pedidosData);
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

const editarEstadoPedido = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    console.log(req.body)

    try {
        // Leer el archivo de pedidos
        const pedidosFile = await fs.readFile(path.join(__dirname, '../db/pedidos.json'), 'utf8');
        const pedidosData = JSON.parse(pedidosFile);

        // Encontrar el pedido por su ID
        const pedidoIndex = pedidosData.findIndex(pedido => pedido.id === parseInt(id));

        // Verificar si el pedido existe
        if (pedidoIndex === -1) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }

        // Actualizar el estado del pedido
        pedidosData[pedidoIndex].estado = estado;

        // Escribir los datos actualizados en el archivo
        await fs.writeFile(path.join(__dirname, '../db/pedidos.json'), JSON.stringify(pedidosData, null, 2));

        // Responder con un mensaje de éxito y los datos del pedido editado
        res.status(200).json({ mensaje: "Estado del pedido editado exitosamente", pedido: pedidosData[pedidoIndex] });
    } catch (error) {
        console.error("Error al editar el estado del pedido:", error);
        res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

const obtenerVentas = async (req, res) => {
  try {
    // Ruta al archivo de ventas
    const ventasPath = path.join(__dirname, '../db/ventas.json');

    // Leer el archivo de ventas
    const data = await fs.readFile(ventasPath, 'utf8');
    const ventas = JSON.parse(data);
    
    // Agrupar las ventas por mesero y calcular el total de ventas por mesero
    const ventasPorMesero = ventas.reduce((acc, venta) => {
      if (!acc[venta.mesero]) {
        acc[venta.mesero] = { ventas: [], totalVentas: 0 };
      }
      acc[venta.mesero].ventas.push(venta);
      acc[venta.mesero].totalVentas += venta.totalVentas;
      return acc;
    }, {});

    res.status(200).json(ventasPorMesero);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


const agregarVenta = async (req, res) => {
  try {
      const { mesero, producto, totalVentas } = req.body;

      // Leer el archivo de ventas
      const ventasPath = path.join(__dirname, '../db/ventas.json');
      let ventas = await fs.readFile(ventasPath, 'utf8');
      ventas = JSON.parse(ventas);

      // Agregar la nueva venta
      ventas.push({ mesero, producto, totalVentas });

      // Escribir los datos actualizados en el archivo
      await fs.writeFile(ventasPath, JSON.stringify(ventas, null, 2));

      res.status(201).json({ mensaje: 'Venta agregada exitosamente' });
  } catch (error) {
      console.error('Error al agregar la venta:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
















module.exports = {
    login,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    obtenerProductos,
    crearProducto,
    editarProducto,
    eliminarProducto,    
    crearPedido,
    obtenerPedidos,
    editarEstadoPedido,
    obtenerVentas,
    agregarVenta
    
    
  };

