import NavBar from './NavBar';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useAuthContext } from '../context/AuthContext.jsx';
import { CarritoContext } from '../context/CarritoContext';
import BagIcon from '../assets/BagIcon.jsx';

const Header = () => {
  const { usuario, logout } = useAuthContext();
  const { carrito } = useContext(CarritoContext);

  const estaLogeado = !!usuario;
  const contadorEnCarrito = carrito.length;

  return (
    <header className={styles.header}>

      <div className={styles.logo}>
        DayZ Store
      </div>

      <div className={styles.navbarContainer}>
        <NavBar />
      </div>

      <div className={styles.iconsContainer}>
        
        {estaLogeado ? (
          <button onClick={logout} className={styles.login}>
            Cerrar Sesión
          </button>
        ) : (
          <Link to="/login">
            <button className={styles.login}>Ingresá</button>
          </Link>
        )}

        <div className={styles.iconoDeCarrito}>
          <Link to="/carrito">
            <BagIcon className={styles.icono} />

            {contadorEnCarrito > 0 && (
              <span className={styles.contadorDeCarrito}>
                {contadorEnCarrito}
              </span>
            )}

          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
