import {  useEffect, useState } from "react";
import { storage} from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
import useObtenerUsuarioLogeado from "../hooks/obtenerUsuarioLogeado";
import useObtenerLinks from "../hooks/obtenerLinks";
import { Link } from "react-router-dom";
import ButtonCerrarSesion from "../componentes/ButtonCerrarSesion";
import obtenerFotoPerfil from "../firebase/obtenerFotoPerfil";
import Header from "../componentes/Header";

const Inicio = () => {
    const [photo, cambiarPhoto] = useState('');
    const {usuario} = useAuth();
    const datosUsuarioLogeado = useObtenerUsuarioLogeado();
    const links = useObtenerLinks();

    useEffect(() => {

        const getUserLogged = async () => {
            const urlImageProfile = await obtenerFotoPerfil(storage, 'man-300x300.png');
            cambiarPhoto(urlImageProfile);
        }

        getUserLogged();
    }, [usuario])

    
    return ( 
        <>  
            <Header />
            <h2>Inicio</h2>

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

            <ButtonCerrarSesion />
        </>
        
    );
}
 
export default Inicio;