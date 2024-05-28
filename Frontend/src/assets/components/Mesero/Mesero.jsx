import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Mesero.css';


const PerfilMesero = ({}) => {
  const [mesa, setMesa] = useState('');
  const [productos, setProductos] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);
  const [estadoPedido, setEstadoPedido] = useState('procesando');
  const [pedido, setPedido] = useState([]);
  const [cantidadProducto, setCantidadProducto] = useState({});
  const [subtotalProductos, setSubtotalProductos] = useState({});
  

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:4000/restaurante/productos');
        if (!response.ok) {
          throw new Error('Error al cargar los productos: ' + response.statusText);
        }
        const data = await response.json();
        setProductos(data); 
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
  
    fetchProductos();
  }, []);

  useEffect(() => {
    const calcularTotal = () => {
      let total = 0;
      pedido.forEach(({ producto, cantidad }) => {
        total += producto.precio * cantidad;
      });
      setTotalVenta(total);
    };

    calcularTotal();
  }, [pedido]);

  const handleAgregarProducto = (producto) => {
    const productoSeleccionado = productos.find(p => p.nombre === producto);
    if (!productoSeleccionado) {
      console.error('Producto no encontrado');
      return;
    }
  
    const productoExistenteIndex = pedido.findIndex(item => item.producto.nombre === producto);
    if (productoExistenteIndex !== -1) {
      const nuevoPedido = [...pedido];
      nuevoPedido[productoExistenteIndex].cantidad++;
      setPedido(nuevoPedido);
    } else {
      setPedido([...pedido, { producto: productoSeleccionado, cantidad: 1 }]);
    }
  };

  const handleQuitarProducto = (producto) => {
    const newPedido = pedido.filter(p => p.producto !== producto);
    const { [producto]: removed, ...newCantidadProducto } = cantidadProducto;
    const { [producto]: removedSubtotal, ...newSubtotalProductos } = subtotalProductos;
    setPedido(newPedido);
    setCantidadProducto(newCantidadProducto);
    setSubtotalProductos(newSubtotalProductos);
  };

  const handleChangeCantidadProducto = (producto, nuevaCantidad) => {
    const nuevoPedido = pedido.map(item => {
      if (item.producto.nombre === producto) {
        const nuevoSubtotal = item.producto.precio * nuevaCantidad;
        return { ...item, cantidad: nuevaCantidad, subtotal: nuevoSubtotal };
      }
      return item;
    });
  
    const nuevoSubtotalProductos = { ...subtotalProductos };
    nuevoSubtotalProductos[producto] = productos.find(p => p.nombre === producto).precio * nuevaCantidad;
  
    setPedido(nuevoPedido);
    setSubtotalProductos(nuevoSubtotalProductos);
    setCantidadProducto({ ...cantidadProducto, [producto]: nuevaCantidad });
  };
  

  

  const handleSubmitPedido = async (e) => {
    e.preventDefault();
    try {
      // Construir la lista de productos para incluir en el pedido
      const productosPedido = pedido.map(({ producto, cantidad }) => ({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad
      }));
  
      // Construir el objeto de pedido con la lista de productos
      const pedidoData = {
        id:null,
        mesa: mesa,
        mesero: localStorage.getItem('nameUser'), // Aquí debes incluir el nombre del mesero, si es fijo o proviene de algún otro lugar
        productos: productosPedido,
        total: totalVenta,
        estado: estadoPedido
      };
      console.log(productosPedido);
      console.log(pedidoData);
  
      // Enviar la solicitud POST al servidor con el objeto de pedido
      const response = await fetch('http://localhost:4000/restaurante/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData), 
      });
  
      
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
    }
  };

  return (
  <div className="mesero-background">
    <div className="FormContainer">
      <div className="BackButtonContainer">
        <Link to="/login" className="BackButton">
          <FiArrowLeft className="ArrowIcon" />
          Cerrar sesión
        </Link>
      </div>
      
      <form onSubmit={handleSubmitPedido}>
        <div className="FormGroup">
          
          <label className="FormLabel">
            Mesa:
            <input className="FormInput" type="text" value={mesa} onChange={(e) => setMesa(e.target.value)} />
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Productos:
            <select className="FormSelect" onChange={(e) => handleAgregarProducto(e.target.value)}>
              <option value="">Selecciona un producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.nombre}>{producto.nombre}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="PedidoContainer">
        {pedido.map(({ producto, cantidad }, index) => (
            <div key={index} className="PedidoItem">
              <span>{producto.nombre}</span> {/* Accede a la propiedad nombre del objeto producto */}
              <div>
                <button type="button"className="decrement" onClick={() => handleChangeCantidadProducto(producto.nombre, cantidad - 1)}>-</button>
                <span>{cantidad}</span>
                <button type="button" className="increment"  onClick={() => handleChangeCantidadProducto(producto.nombre, cantidad + 1)}>+</button>

              </div>
              <span>{subtotalProductos[producto]}</span>
              <button type="button" onClick={() => handleQuitarProducto(producto)}>Quitar</button>
          </div>
          ))}
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Total de la Venta:
            <input className="FormInput" type="number" value={totalVenta} onChange={(e) => setTotalVenta(e.target.value)} />
          </label>
        </div>
        <div className="FormGroup">
          <label className="FormLabel">
            Estado del Pedido:
            <select className="FormSelect" value={estadoPedido} onChange={(e) => setEstadoPedido(e.target.value)}>
              <option value="procesando">Procesando</option>
              
            </select>
          </label>
        </div>
        <button className="FormButton" type="submit">Realizar Pedido</button>
        
      </form>
    </div>
  </div>
  );
};

export default PerfilMesero;
