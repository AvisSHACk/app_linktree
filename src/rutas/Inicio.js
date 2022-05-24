import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage, ref, getDownloadURL, auth, signOut} from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
import useObtenerUsuarioLogeado from "../hooks/obtenerUsuarioLogeado";

const Inicio = () => {
    const [usuario, cambiarUsuario] = useState();
    const history = useNavigate();
    const usuarioLogeado = useAuth();

    const datosUsuarioLogeado = useObtenerUsuarioLogeado(usuarioLogeado.usuario.uid);
    useEffect(() => {
        const obtenerUrl = async () => {
            const user = datosUsuarioLogeado;
            if(user) {
                const url = await getDownloadURL(ref(storage, user.data().photo));
                cambiarUsuario({
                    correo: user.correo,
                    photo: url
                });
            }
        }

        obtenerUrl();

    }, [datosUsuarioLogeado])

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
            <img src={usuario && usuario.photo} alt="" />
            <button onClick={cerrarSesion}>Cerrar sesion</button>
        </>
        
    );
}
 
export default Inicio;