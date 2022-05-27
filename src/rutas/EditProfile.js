import {  useEffect, useState } from "react";
import { storage, ref, getDownloadURL, updateDoc, doc, db} from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
import useObtenerUsuarioLogeado from "../hooks/obtenerUsuarioLogeado";
import ButtonCerrarSesion from "../componentes/ButtonCerrarSesion";
import useObtenerLinks from "../hooks/obtenerLinks";

const Inicio = () => {
    const [nombre, cambiarNombre] = useState("");
    const [correo, cambiarCorreo] = useState("");
    const [photo, cambiarPhoto] = useState('');
    const {usuario} = useAuth();
    const datosUsuarioLogeado = useObtenerUsuarioLogeado();
    const links = useObtenerLinks();

    

    useEffect(() => {
        console.log(datosUsuarioLogeado)
        if(datosUsuarioLogeado.length) {
            cambiarNombre(datosUsuarioLogeado[0].nombre);
            cambiarCorreo(datosUsuarioLogeado[0].correo);
        }
        const getUserLogged = async () => {
                const imagenProfileRef = ref(storage, 'man-300x300.png');
                const urlImageProfile = await getDownloadURL(imagenProfileRef);
                cambiarPhoto(urlImageProfile)
            
        }

        getUserLogged();
    }, [datosUsuarioLogeado])

    const handleSubmit = (e) => {
        e.preventDefault();
        const editarGasto = async () => {
            await updateDoc(doc(db, 'usuarios', usuario.uid), {
                correo: correo,
                nombre: nombre,
            }).then(() => {
                console.log('Se actualizo el perfil');
            })
        }

        editarGasto();
    }

    const handleChange = (e) => {

        if(e.target.name === "nombre") {
            cambiarNombre(e.target.value);
        } else if(e.target.name === "correo") {
            cambiarCorreo(e.target.value);
        }

    }
    return ( 
        <>
            <h1>Inicio</h1>
            <img src={photo} alt="" />
            <form action="" onSubmit={handleSubmit}>
               
                    <input 
                        type="text" 
                        name="nombre"
                        id="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                
                    <input 
                        type="correo" 
                        name="correo"
                        id="correo"
                        value={correo}
                        onChange={handleChange}
                    />

                <button type="submit">Actualizar perfil</button>
            </form>
            {links.map((link) => {
                return <a href={link.url}>{link.titulo}</a>
            })}
            
            <ButtonCerrarSesion />
        </>
        
    );
}
 
export default Inicio;