import { useEffect, useState } from "react";
import { db, query, collection, onSnapshot, where  } from "../firebase/firebaseConfig";
const useObtenerLinks = (uid) => {
    const [links, cambiarLinks] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'links'), where('uid', '==', uid));

        const onSuscribe = onSnapshot(q, 
            (snapshot) => {
                cambiarLinks(snapshot.docs.map(link => link.data()))
            }
        )

        return onSuscribe;
    }, [uid])

    return links;
}
 
export default useObtenerLinks;