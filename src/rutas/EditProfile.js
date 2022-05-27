import {  useEffect, useState } from "react";
import { storage, ref, getDownloadURL, updateDoc, doc, db} from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
import useObtenerUsuarioLogeado from "../hooks/obtenerUsuarioLogeado";
import ButtonCerrarSesion from "../componentes/ButtonCerrarSesion";
import useObtenerLinks from "../hooks/obtenerLinks";
import {  } from "firebase/firestore";

const Inicio = () => {
    const [usuario, cambiarUsuario] = useState([]);
    const [nombre, cambiarNombre] = useState('');
    const [correo, cambiarCorreo] = useState('');
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

                cambiarNombre(datosUsuarioLogeado.nombre);
                cambiarCorreo(datosUsuarioLogeado.correo);
            }
        }
        
        console.log(datosUsuarioLogeado)

        getUserLogged();
    }, [datosUsuarioLogeado])

    const handleSubmit = (e) => {
        e.preventDefault();
        const editarGasto = async () => {
            await updateDoc(doc(db, 'usuarios', usuarioLogeado.usuario.uid), {
                correo: correo,
                nombre: nombre,
            }).then(() => {
                console.log('Se actualizo el perfil');
            })
        }

        editarGasto();
    }
    return ( 
        <>
            <h1>Inicio</h1>

            <img src={usuario.photo} alt="" />
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">
                    Nombre:
                    <input 
                        type="text" 
                        name="nombre"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => cambiarNombre(e.target.value)}
                    />
                </label>
                <label htmlFor="">
                    Correo:
                    <input 
                        type="correo" 
                        name="correo"
                        id="correo"
                        value={correo}
                        onChange={(e) => cambiarCorreo(e.target.value)}
                    />
                </label>

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