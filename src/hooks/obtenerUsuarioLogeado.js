import { useEffect, useState } from "react";
import { db, getDoc, doc  } from "../firebase/firebaseConfig";
const useObtenerUsuarioLogeado = (uid) => {
    const [usuario, cambiarUsuario] = useState();

    useEffect(() => {
        const getUserCollection = async () => {
            const userRef = doc(db, `usuarios/${uid}`);
            const usuarioCollection = await getDoc(userRef);

            cambiarUsuario(usuarioCollection.data());
        }
        
        getUserCollection();
        
    }, [uid])

    return usuario;
}
 
export default useObtenerUsuarioLogeado;