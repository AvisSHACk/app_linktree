import {  useEffect, useState } from "react";
import { storage, ref, getDownloadURL} from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
import useObtenerUsuarioLogeado from "../hooks/obtenerUsuarioLogeado";
import ButtonCerrarSesion from "../componentes/ButtonCerrarSesion";
import useObtenerLinks from "../hooks/obtenerLinks";

const Inicio = () => {
    const [usuario, cambiarUsuario] = useState([]);

    const usuarioLogeado = useAuth();
    const datosUsuarioLogeado = useObtenerUsuarioLogeado(usuarioLogeado.usuario.uid);
    const links = useObtenerLinks(usuarioLogeado.usuario.uid);

    useEffect(() => {

        const getUserLogged = async () => {
            const imagenProfileRef = ref(storage, 'man-300x300.png');
            const urlImageProfile = await getDownloadURL(imagenProfileRef);

            if(datosUsuarioLogeado) {
                cambiarUsuario({
                    correo: datosUsuarioLogeado.correo,
                    nombre: datosUsuarioLogeado.nombre,
                    photo: urlImageProfile
                })
            }
        }

        getUserLogged();
    }, [datosUsuarioLogeado])
    return ( 
        <>
            <h1>Inicio</h1>

            <img src={usuario.photo} alt="" />
            <p>Nombre: {usuario.nombre}</p>
            <p>Email: {usuario.correo}</p>
            
            {links.map((link) => {
                return <a href={link.facebook}>Facebook</a>
            })}
            
            <ButtonCerrarSesion />
        </>
        
    );
}
 
export default Inicio;