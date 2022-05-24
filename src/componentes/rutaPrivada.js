import {useAuth} from "./../hooks/authContext";

import {Navigate, Outlet} from "react-router-dom";

const RutaProtegida = () => {
    const {usuario} = useAuth();

    if(usuario) {
        return <Outlet />
    } else {
        return <Navigate to="/iniciarsesion" />
    }
}

export default RutaProtegida;