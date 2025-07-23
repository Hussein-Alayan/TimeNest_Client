import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () =>{
    return (
        <header className={styles.appHeader}>
            <div className={styles.logo}>TimeNest</div>
            <nav className={styles.navLinks}>
                <Link to="/">Home</Link>
                <Link to="/wall">Wall</Link>
                <Link to="/map">Map</Link>
                <Link to="/profile">Profile</Link>
            </nav>
        </header>
    );
};

export default Header;