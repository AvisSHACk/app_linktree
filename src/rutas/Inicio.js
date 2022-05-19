
import { useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase/firebaseConfig";

const Inicio = () => {
    const history = useNavigate()
    const cerrarSesion = () => {
        try {
            signOut(auth);
            history('/iniciarsesion');
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <>
            <h1>Inicio</h1>
            <button onClick={cerrarSesion}>Cerrar sesion</button>
        </>
        
    );
}
 
export default Inicio;