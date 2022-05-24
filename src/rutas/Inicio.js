import {  useEffect, useState } from "react";
import { storage, ref, getDownloadURL} from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
import useObtenerUsuarioLogeado from "../hooks/obtenerUsuarioLogeado";
import ButtonCerrarSesion from "../componentes/ButtonCerrarSesion";
import useObtenerLinks from "../hooks/obtenerLinks";

const Inicio = () => {
    const [usuario, cambiarUsuario] = useState();
    const [linksUsuario, cambiarLinksUsuario] = useState();
    const usuarioLogeado = useAuth();
    const datosUsuarioLogeado = useObtenerUsuarioLogeado(usuarioLogeado.usuario.uid);

    const link = useObtenerLinks(usuarioLogeado.usuario.uid);
    
    useEffect(() => {
        const guardarDatosUsuario = async () => {
            if(datosUsuarioLogeado) {
                const url = await getDownloadURL(ref(storage, datosUsuarioLogeado.data().photo));
                cambiarUsuario({
                    nombre: datosUsuarioLogeado.data().nombre,
                    correo: datosUsuarioLogeado.data().correo,
                    photo: url
                });
                
                cambiarLinksUsuario(link);
            }
        }
        // cambiarLinks()

        guardarDatosUsuario()
        
    }, [datosUsuarioLogeado, link])
    return ( 
        <>
            <h1>Inicio</h1>
            {usuario && 
            <>
                <img src={usuario.photo} alt="" />
                <p>Nombre: {usuario.nombre}</p>
            </>


            }

            {linksUsuario && 
                linksUsuario.map((link) => {
                    return <a href={link.facebook}>Facebook</a>
                })
            }
            
            <ButtonCerrarSesion />
        </>
        
    );
}
 
export default Inicio;