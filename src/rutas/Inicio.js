import {  useEffect, useState } from "react";
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
        const guardarDatosUsuario = async () => {
            const url = await getDownloadURL(ref(storage, datosUsuarioLogeado.data().photo));
            if(datosUsuarioLogeado) {
                cambiarUsuario({
                    correo: datosUsuarioLogeado.data().correo,
                    photo: url
                });
            }
        }

        guardarDatosUsuario()
        
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