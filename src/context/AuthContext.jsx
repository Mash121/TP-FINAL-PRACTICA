import { useContext, useState, createContext, useEffect } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

// Usuarios válidos
const usuariosValidos = [
  { nombre: "martin", password: "4268", rol: "admin" },
  { nombre: "james", password: "4268", rol: "cliente" },
];

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Cargar sesión persistida
  useEffect(() => {
    const guardado = localStorage.getItem("usuarioLogeado");
    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
  }, []);

  // LOGIN
  const login = (nombreUsuario, password) => {
    const nombreFinal = nombreUsuario.toLowerCase().trim();
    const passFinal = password.trim();

    const user = usuariosValidos.find(
      (u) => u.nombre === nombreFinal && u.password === passFinal
    );

    if (!user) return false;

    setUsuario(user);
    localStorage.setItem("usuarioLogeado", JSON.stringify(user));
    return true;
  };

  // LOGOUT — ❗ YA NO BORRA EL CARRITO
  const logout = () => {
    localStorage.removeItem("usuarioLogeado");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
