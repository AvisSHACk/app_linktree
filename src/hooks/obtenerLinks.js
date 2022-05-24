import { useEffect, useState } from "react";
import { db, query, collection, onSnapshot, where, limit  } from "../firebase/firebaseConfig";
const useObtenerLinks = (uid) => {
    const [links, cambiarLinks] = useState();

    useEffect(() => {

        const onSuscribe = onSnapshot(query(collection(db, "links"),
        where('uid', '==', uid ),
        limit(10)),
        (snapshot) => {
            cambiarLinks(snapshot.docs.map((anime) => {
                return anime.data()
            }))
        })
        console.log(onSuscribe);
        // cambiarTodosLosDatosObtenidos(true)
        return onSuscribe;
    }, [uid])

    return links;
}
 
export default useObtenerLinks;