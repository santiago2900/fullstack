import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Logueo from '../src/assets/components/login/Login';
import Sidebar from '../src/assets/components/Administrador/Admin';
import CrearUsuario from './assets/components/usuarios/CrearUsuario';
import CrearProducto from './assets/components/productos/CrearProducto';
import './App.css';
import PerfilMesero from './assets/components/Mesero/Mesero';
import EditarProducto from './assets/components/productos/EditarProducto';
import EliminarProducto from './assets/components/productos/EliminarProducto';
import EditarUsuario from './assets/components/usuarios/EditarUsuario';
import EliminarUsuario from './assets/components/usuarios/EliminarUsuario';
import TotalVentas from './assets/components/ventas/Ventas';
import PerfilCocina from './assets/components/cocina/cocina';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Logueo />} />
          <Route path="/admin" element={<Sidebar />} />
          <Route path="/admin/crear-usuario" element={<CrearUsuario />} />
          <Route path="/admin/editar-usuario" element={<EditarUsuario />} />
          <Route path="/admin/eliminar-usuario" element={<EliminarUsuario />} />
          <Route path="/admin/crear-producto" element={<CrearProducto />} />
          <Route path="/admin/editar-producto" element={<EditarProducto />} />
          <Route path="/admin/eliminar-producto" element={<EliminarProducto />} />
          <Route path="/admin/total-ventas" element={<TotalVentas />} />
          <Route path='/perfil-mesero' element={<PerfilMesero />} />
          <Route path='/perfil-cocina' element={<PerfilCocina />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
