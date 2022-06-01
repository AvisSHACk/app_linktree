import { NavLink } from "react-router-dom";
const Header = () => {
    return ( 
        <header>
            <div className="contenedorLayout--row">
                <h1>Logo</h1>
                <nav>
                    <NavLink to="/">Inicio</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </nav>
            </div>
        </header>
     );
}
export default Header;