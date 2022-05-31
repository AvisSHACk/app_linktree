import { ref, getDownloadURL} from "../firebase/firebaseConfig";
const obtenerFotoPerfil = async (storage, photo) => {
    const imagenProfileRef = ref(storage, photo);
    const urlImageProfile = await getDownloadURL(imagenProfileRef);
    return urlImageProfile;
}
 
export default obtenerFotoPerfil;