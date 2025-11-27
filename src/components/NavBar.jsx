import { Link } from 'react-router-dom';
import styles from './NavBar.module.css'; 
import { useAuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { usuario } = useAuthContext();

  // usuario = { nombre: "martin", rol: "admin" }
  const esAdmin = usuario?.rol === 'admin';

  return (
    <nav className={styles.navbar}>
      <ul className={styles.lista}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>Inicio</Link>
          <Link to="/tecnologia" className={styles.link}>Tecnología</Link>
          <Link to="/moda" className={styles.link}>Juegos 2026</Link>

          {esAdmin && (
            <Link to="/admin/productos" className={styles.link}>Admin</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
