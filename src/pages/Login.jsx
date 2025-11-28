import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const manejarSubmit = (evento) => {
    evento.preventDefault();

    const user = usuario.toLowerCase().trim();
    const pass = contrasenia.trim();

    const result = login(user, pass);

    if (!result) {
      alert("Usuario o contraseña incorrectos");
      return;
    }

    // 🔥 REDIRECCIONES
    if (user === "martin") navigate('/admin');
    else if (user === "james") navigate('/carrito');
    else navigate('/');

    setUsuario('');
    setContrasenia('');
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h3>Iniciar Sesión</h3>

      <label>Usuario</label>
      <input
        type="text"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />

      <label>Contraseña</label>
      <input
        type="password"
        value={contrasenia}
        onChange={(e) => setContrasenia(e.target.value)}
        required
      />

      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
