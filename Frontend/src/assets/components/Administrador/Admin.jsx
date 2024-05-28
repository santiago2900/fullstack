import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineShop, AiOutlineDollar } from 'react-icons/ai';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import './Admin.css';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [usuariosDesplegado, setUsuariosDesplegado] = useState(false);
  const [productosDesplegado, setProductosDesplegado] = useState(false);
  const [ventasDesplegado, setVentasDesplegado] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div className={`sidebar-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarVisible ? <BsArrowLeft /> : <BsArrowRight />}
      </div>
      <div className="sidebar-content">
        <div className="sidebar-group">
          <div className="sidebar-group-title" onClick={() => setUsuariosDesplegado(!usuariosDesplegado)}>
            <AiOutlineUser size={20} />
            <span>Usuarios</span>
          </div>
          {usuariosDesplegado && (
            <div className="sidebar-options">
              <NavLink to="/admin/crear-usuario" className="sidebar-option">
                Crear Usuario
              </NavLink>
              <NavLink to="/admin/editar-usuario" className="sidebar-option">
                Editar Usuario
              </NavLink>
              <NavLink to="/admin/eliminar-usuario" className="sidebar-option">
                Eliminar Usuario
              </NavLink>
            </div>
          )}
        </div>
        <div className="sidebar-group">
          <div className="sidebar-group-title" onClick={() => setProductosDesplegado(!productosDesplegado)}>
            <AiOutlineShop size={20} />
            <span>Productos</span>
          </div>
          {productosDesplegado && (
            <div className="sidebar-options">
              <NavLink to="/admin/crear-producto" className="sidebar-option">
                Crear Producto
              </NavLink>
              <NavLink to="/admin/editar-producto" className="sidebar-option">
                Editar Producto
              </NavLink>
              <NavLink to="/admin/eliminar-producto" className="sidebar-option">
                Eliminar Producto
              </NavLink>
            </div>
          )}
        </div>
        <div className="sidebar-group">
          <div className="sidebar-group-title" onClick={() => setVentasDesplegado(!ventasDesplegado)}>
            <AiOutlineDollar size={20} />
            <span>Ventas</span>
          </div>
          {ventasDesplegado && (
            <div className="sidebar-options">
              <NavLink to="/admin/total-ventas" className="sidebar-option">
                Total de Ventas
              </NavLink>
            </div>
          )}
        </div>
      </div>
      {sidebarVisible && (
        <button className="Btn" onClick={handleLogout}>
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Cerrar Sesión</div>
        </button>
      )}
    </div>
  );
};

export default Sidebar;
