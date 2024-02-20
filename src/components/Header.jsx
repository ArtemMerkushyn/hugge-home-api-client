import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';


export const Header = () => {
    return (
        <header className={styles.header}>
            <NavLink to={'/'}>Головна</NavLink>
            <NavLink to={'/add-product'}>Добавити продукт</NavLink>
        </header>
    );
}
