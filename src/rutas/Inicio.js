import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage, ref, getDownloadURL, auth, signOut, onAuthStateChanged, db, getDoc, doc  } from "../firebase/firebaseConfig";

const Inicio = () => {
    const [usuario, cambiarUsuario] = useState();
    const history = useNavigate();

    const getUsuario = async (uid) => {
        const docuRef = doc(db, `usuarios/${uid}`);
        const docuCifrada = await getDoc(docuRef);
        const infoFinal = docuCifrada.data();
        return infoFinal;
    }
    
    useEffect(() => {
        onAuthStateChanged(auth, async (usuario) => {
            const user = await getUsuario(usuario.uid);
            const url = await getDownloadURL(ref(storage, user.photo));
            cambiarUsuario({
                correo: user.correo,
                photo: url
            });
        })
    }, [])

    const cerrarSesion = () => {
        try {
            signOut(auth);
            history('/iniciarsesion');
        } catch (error) {
            console.log(error)
        }
    }

    console.log(usuario)

    
    return ( 
        <>
            <h1>Inicio</h1>
            <img src={usuario && usuario.photo} alt="" />
            <button onClick={cerrarSesion}>Cerrar sesion</button>
        </>
        
    );
}
 
export default Inicio;