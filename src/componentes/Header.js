import { NavLink } from "react-router-dom";
const Header = () => {
    return ( 
        <header>
            <h1>Logo</h1>
            <nav>
                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </header>
     );
}
 
export default Header;