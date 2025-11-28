import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Carrito from "./components/Carrito";
import RutaProtegida from "./components/RutaProtegida";
import Admin from "./components/Admin";
import GestionProductos from "./components/GestionProducto";
import Inicio from "./pages/Inicio";
import Moda from "./pages/Moda";
import Tecnologia from "./pages/Tecnologia";
import ProductoDetalle from "./pages/ProductoDetalle";
import Login from "./pages/Login";

import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { ProductosProvider } from "./context/ProductosContext";
import { CarritoProvider } from "./context/CarritoContext";

function AppContent() {
  const { usuario, login, logout } = useAuthContext();
  const estaAutenticado = !!usuario;

  return (
    <>
      <Header cerrarSesion={logout} autenticado={estaAutenticado} />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/moda" element={<Moda />} />
        <Route path="/tecnologia" element={<Tecnologia />} />
        <Route path="/productos/:id" element={<ProductoDetalle />} />
        <Route path="/login" element={<Login iniciarSesion={login} />} />

        <Route
          path="/carrito"
          element={
            <RutaProtegida autenticado={estaAutenticado}>
              <Carrito />
            </RutaProtegida>
          }
        />

        <Route
          path="/admin"
          element={
            <RutaProtegida autenticado={estaAutenticado}>
              <Admin />
            </RutaProtegida>
          }
        />

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
      <CarritoProvider>
        <ProductosProvider>
          <AppContent />
        </ProductosProvider>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
