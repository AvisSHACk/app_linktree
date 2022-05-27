import { useEffect, useState } from "react";
import { db, query, collection, onSnapshot, where  } from "../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";
const useObtenerLinks = () => {
    const [links, cambiarLinks] = useState([]);
    const {usuario} = useAuth();

    useEffect(() => {
        const q = query(collection(db, 'links'), where('uid', '==', usuario.uid));

        const onSuscribe = onSnapshot(q, 
            (snapshot) => {
                cambiarLinks(snapshot.docs.map(link => link.data()))
            }
        )

        return onSuscribe;
    }, [usuario.uid])

    return links;
}
 
export default useObtenerLinks;