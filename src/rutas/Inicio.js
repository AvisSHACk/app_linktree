import {  useEffect, useState } from "react";
import { storage, ref, getDownloadURL} from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
import useObtenerUsuarioLogeado from "../hooks/obtenerUsuarioLogeado";
import useObtenerLinks from "../hooks/obtenerLinks";
import { Link } from "react-router-dom";

const Inicio = () => {
    const [nombre, cambiarNombre] = useState('');
    const [correo, cambiarCorreo] = useState('');
    const [photo, cambiarPhoto] = useState('');
    const usuarioLogeado = useAuth();
    const datosUsuarioLogeado = useObtenerUsuarioLogeado(usuarioLogeado.usuario.uid);
    const links = useObtenerLinks(usuarioLogeado.usuario.uid);

    console.log(links)

    useEffect(() => {

        const getUserLogged = async () => {
            const imagenProfileRef = ref(storage, 'man-300x300.png');
            const urlImageProfile = await getDownloadURL(imagenProfileRef);

            if(datosUsuarioLogeado) {
                cambiarNombre(datosUsuarioLogeado.nombre);
                cambiarCorreo(datosUsuarioLogeado.correo);
                cambiarPhoto(urlImageProfile);
            }
        }

        getUserLogged();
    }, [datosUsuarioLogeado])

    
    return ( 
        <>
            <h1>Inicio</h1>

            <img src={photo} alt="" />
            <p>Nombre: {nombre}</p>
            <p>Correo: {correo}</p>
            {links.map((link) => {
                return <a href={link.url}>{link.titulo}</a>
            })}

            <Link to={`/editProfile/${usuarioLogeado.usuario.uid}`}>Editar perfil</Link>
        </>
        
    );
}
 
export default Inicio;