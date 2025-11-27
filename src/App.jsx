import { Routes, Route } from "react-router-dom";

// Componentes generales
import Header from "./components/Header";
import Footer from "./components/Footer";

// Componentes protegidos
import Carrito from "./components/Carrito";
import RutaProtegida from "./components/RutaProtegida";
import Admin from "./components/Admin";
import GestionProductos from "./components/GestionProducto";

// Páginas
import Inicio from "./pages/Inicio";
import Moda from "./pages/Moda";
import Tecnologia from "./pages/Tecnologia";
import ProductoDetalle from "./pages/ProductoDetalle";
import Login from "./pages/Login";

// Contextos
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { ProductosProvider } from "./context/ProductosContext";  // ✅ IMPORTANTE

function AppContent() {
  const { usuario, login, logout } = useAuthContext();
  const estaAutenticado = !!usuario;

  return (
    <>
      <Header cerrarSesion={logout} autenticado={estaAutenticado} />

      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/moda" element={<Moda />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/login" element={<Login iniciarSesion={login} />} />

        {/* Rutas protegidas */}
        <Route
          path="/carrito"
          element={
            <RutaProtegida autenticado={estaAutenticado}>
              <Carrito />
            </RutaProtegida>
          }
        />

        {/* Panel de administración */}
        <Route
          path="/admin"
          element={
            <RutaProtegida autenticado={estaAutenticado}>
              <Admin />
            </RutaProtegida>
          }
        />

        {/* Gestión de productos dentro del admin */}
        <Route
          path="/admin/productos"
          element={
            <RutaProtegida autenticado={estaAutenticado}>
              <GestionProductos />
            </RutaProtegida>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductosProvider>    {/* ✅ AHORA SÍ EL PROVIDER ENVUELVE TODO */}
        <AppContent />
      </ProductosProvider>
    </AuthProvider>
  );
}

export default App;
