import { useEffect, useState } from "react";
import { db, getDoc, doc  } from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
const useObtenerUsuarioLogeado = () => {
    const [usuarioLogeado, cambiarUsuarioLogeado] = useState([]);
    const {usuario} = useAuth();
    useEffect(() => {
        const getUserCollection = async () => {
            const userRef = doc(db, `usuarios/${usuario.uid}`);
            const usuarioCollection = await getDoc(userRef);

            cambiarUsuarioLogeado([usuarioCollection.data()]);
        }
        
        getUserCollection();
        
    }, [usuario.uid])

    return usuarioLogeado;
}
 
export default useObtenerUsuarioLogeado;