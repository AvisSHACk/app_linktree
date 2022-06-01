import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth, createUserWithEmailAndPassword, doc, setDoc } from "./../firebase/firebaseConfig";
import { useAuth } from "../hooks/authContext";

const Registro = () => {
    const [nombre, cambiarNombre] = useState('');
    const [correo, cambiarCorreo] = useState('');
    const [password, cambiarPassword] = useState('');
    const [mensaje, cambiarMensaje] = useState('');

    const history = useNavigate();
    const {usuario} = useAuth();

    useEffect(() => {
        if(usuario) {
            history("/")
        }
    }, [usuario, history])

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(correo === '' && 
            password === '' &&
            nombre === '') {
            cambiarMensaje('Los campos no pueden estar vacios');
            return;
        }

        try {
            const infoUsuario = await createUserWithEmailAndPassword(auth, correo, password);
            console.log(infoUsuario.user.uid);
            const docuRef = doc(db, `usuarios/${infoUsuario.user.uid}`);
            setDoc(docuRef, {
                nombre: nombre, 
                correo:correo, 
                photo:'man-300x300.png'
            })
            history('/');
        } catch (error) {
            console.log(error.code);
            switch (error.code) {
                case 'auth/weak-password':
                    cambiarMensaje('La contraseña debe contener al menos 6 caracteres');
                    break;
                case 'auth/email-already-exists':
                    cambiarMensaje('El email ya pertenece a un usuario');
                    break;
                default:
                    cambiarMensaje('Ha ocurrido un error en el servidor');
                    break;
            }
        }

    }
    return ( 
        <>

            <div className="container">
                <h1>Registro</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="nombre" 
                        id="nombre"
                        value={nombre}
                        onChange={(e) => cambiarNombre(e.target.value)}
                        placeholder="Ingresa tu nombre"
                    />

                    <input 
                        type="text" 
                        name="correo" 
                        id="correo"
                        value={correo}
                        onChange={(e) => cambiarCorreo(e.target.value)}
                        placeholder="Ingresa tu correo"
                    />

                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={password}
                        onChange={(e) => cambiarPassword(e.target.value)}
                        placeholder="Ingresa tu password"
                    />

                    <button>Registrarse</button>
                </form>
                <div className="mensaje">{mensaje}</div>
            </div>
        </>
     );
}
 
export default Registro;