import { createContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { usuario } = useAuthContext();
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito del usuario
  useEffect(() => {
    if (!usuario) return;

    const key = `carrito_${usuario.nombre}`;
    const guardado = localStorage.getItem(key);

    setCarrito(guardado ? JSON.parse(guardado) : []);
  }, [usuario]);

  // Guardar carrito del usuario cuando cambia
  useEffect(() => {
    if (!usuario) return;

    const key = `carrito_${usuario.nombre}`;
    localStorage.setItem(key, JSON.stringify(carrito));
  }, [carrito, usuario]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarDelCarrito = (indice) => {
    setCarrito((prev) => prev.filter((_, i) => i !== indice));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
