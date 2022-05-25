import { useEffect, useState } from "react";
import { db, getDoc, doc  } from "../firebase/firebaseConfig";
const useObtenerUsuarioLogeado = (uid) => {
    const [usuarioLogeado, cambiarUsuarioLogeado] = useState();
    useEffect(() => {

        const obtenerUsuario = async () => {
            const docRef = doc(db, `usuarios/${uid}`);
            const docSnap = await getDoc(docRef);
            
            if(docSnap.exists()) {
                cambiarUsuarioLogeado(docSnap.data());
            };
        }

        obtenerUsuario()
    }, [uid])

    return usuarioLogeado;
}
 
export default useObtenerUsuarioLogeado;