import {  useEffect, useState } from "react";
import { storage, ref, getDownloadURL} from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
import useObtenerUsuarioLogeado from "../hooks/obtenerUsuarioLogeado";
import useObtenerLinks from "../hooks/obtenerLinks";
import { Link } from "react-router-dom";

const Inicio = () => {
    const [photo, cambiarPhoto] = useState('');
    const {usuario} = useAuth();
    const datosUsuarioLogeado = useObtenerUsuarioLogeado();
    const links = useObtenerLinks();

    useEffect(() => {

        const getUserLogged = async () => {
            const imagenProfileRef = ref(storage, 'man-300x300.png');
            const urlImageProfile = await getDownloadURL(imagenProfileRef);

            if(urlImageProfile) {
                cambiarPhoto(urlImageProfile);
            }
        }

        getUserLogged();
    }, [usuario])

    
    return ( 
        <>
            <h1>Inicio</h1>

            <img src={photo} alt="" />

            {datosUsuarioLogeado.map((usuario) => (
                <>
                    <p>Nombre: {usuario.nombre}</p>
                    <p>Correo: {usuario.correo}</p>
                </>
            ))}
            
            {links.map((link) => {
                return <a href={link.url}>{link.titulo}</a>
            })}

            <Link to={`/editProfile/${usuario.uid}`}>Editar perfil</Link>
        </>
        
    );
}
 
export default Inicio;