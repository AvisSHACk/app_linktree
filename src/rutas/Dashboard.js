
import { addDoc, collection, db } from "./../firebase/firebaseConfig";
import {useState } from "react";
import useObtenerLinks from "../hooks/obtenerLinks";
import { useAuth } from "../hooks/authContext";
import Header from "../componentes/Header";

const Dashboard = () => {
    const [titulo, cambiarTitulo] = useState('');
    const [url, cambiarUrl] = useState('');
    const usuario = useAuth();
    const linkCollection = useObtenerLinks(usuario.usuario.uid);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, 'links'), {
            titulo: titulo,
            url: url,
            uid: usuario.usuario.uid
        });
    }
    return ( 
        <>
            <Header />
            <h2>Dashboard</h2>
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="titulo" 
                    id="titulo"
                    value={titulo}
                    onChange={(e) => cambiarTitulo(e.target.value)}
                    placeholder="Titulo"
                />

                <input 
                    type="text" 
                    name="url" 
                    id="url"
                    value={url}
                    onChange={(e) => cambiarUrl(e.target.value)}
                    placeholder="Url"
                />

                <button>Agregar enlace</button>
            </form>

            <div>
                <ul>
                {linkCollection && linkCollection.map((link) => {
                    return <li>
                        <p>{link.titulo}</p>
                        <p>{link.url}</p>
                    </li>
                })}
                </ul>
            </div>
        </>
     );
}
 
export default Dashboard;