import {  useEffect, useRef, useState } from "react";
import { storage, ref, updateDoc, doc, db} from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
import useObtenerUsuarioLogeado from "../hooks/obtenerUsuarioLogeado";
import useObtenerLinks from "../hooks/obtenerLinks";
import { uploadBytes } from "firebase/storage";
import obtenerFotoPerfil from "../firebase/obtenerFotoPerfil";
import Header from "../componentes/Header";

const Inicio = () => {
    const [nombre, cambiarNombre] = useState("");
    const [correo, cambiarCorreo] = useState("");
    const [photo, cambiarPhoto] = useState('');
    const {usuario} = useAuth();
    const datosUsuarioLogeado = useObtenerUsuarioLogeado();
    const links = useObtenerLinks();
    const photoImage = useRef();
    

    useEffect(() => {
        const profileView = async () => {
            if(datosUsuarioLogeado.length) {
                cambiarNombre(datosUsuarioLogeado[0].nombre);
                cambiarCorreo(datosUsuarioLogeado[0].correo);
                const urlImageProfile = await obtenerFotoPerfil(storage, datosUsuarioLogeado[0].photo);
                cambiarPhoto(urlImageProfile);
            }
        }

        profileView();

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

    const changeClickPhoto = () => {
        photoImage.current.click();
    }

    const changePhoto = async (e) => {

        const files = e.target.files;
        const fileReader = new FileReader();

        if(fileReader && files && files.length > 0) {
            fileReader.readAsArrayBuffer(files[0])
            fileReader.onload = async () => {
                const imageData = fileReader.result;

                const photoRef = ref(storage, `images/${usuario.uid}`);

                const res = await uploadBytes(photoRef, imageData);

                if(res) {
                    await updateDoc(doc(db, 'usuarios', usuario.uid), {
                        photo: res.metadata.fullPath
                    }).then(() => {
                        console.log('Se actualizo el perfil');
                    })

                    const urlImageProfile = await obtenerFotoPerfil(storage, datosUsuarioLogeado[0].photo);
                    cambiarPhoto(urlImageProfile);
                }
            }
        }


    }


    return ( 
        <>
            <Header />
            <h2>Editar Perfil</h2>
            <div>
                <img src={photo} alt="" />
                <button onClick={changeClickPhoto}>Cambiar foto de perfil</button>
                <input ref={photoImage} type="file" onChange={changePhoto}/>
            </div>
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
            
            
        </>
        
    );
}
 
export default Inicio;