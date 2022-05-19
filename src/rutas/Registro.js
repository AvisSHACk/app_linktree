import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, createUserWithEmailAndPassword } from "./../firebase/firebaseConfig";

const Registro = () => {
    const [correo, cambiarCorreo] = useState('');
    const [password, cambiarPassword] = useState('');
    const [mensaje, cambiarMensaje] = useState('');

    const history = useNavigate();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(correo === '' && password === '') {
            cambiarMensaje('Los campos no pueden estar vacios');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, correo, password);
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
            <h1>Registro</h1>
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="correo" 
                    id="correo"
                    value={correo}
                    onChange={(e) => cambiarCorreo(e.target.value)}
                />

                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={password}
                    onChange={(e) => cambiarPassword(e.target.value)}
                />

                <button>Registrarse</button>
            </form>
            <div className="mensaje">{mensaje}</div>
        </>
     );
}
 
export default Registro;