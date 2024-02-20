import { NavLink } from "react-router-dom";


export const Header = () => {
    return (
        <div>
            <NavLink to={'/'}>Головна</NavLink>
            <NavLink to={'/add-product'}>Добавити продукт</NavLink>
        </div>
    );
}
