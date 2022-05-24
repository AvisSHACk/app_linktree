import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase/firebaseConfig";
const ButtonCerrarSesion = () => {
    const history = useNavigate();
    const cerrarSesion = () => {
        try {
            signOut(auth);
            history('/iniciarsesion');
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <button onClick={cerrarSesion}>Cerrar sesion</button>
     );
}
 
export default ButtonCerrarSesion;