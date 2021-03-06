import { BrowserRouter, Routes, Route } from "react-router-dom";
import RutaProtegida from "./componentes/rutaPrivada";
import { AuthProvider } from "./hooks/authContext";
import Dashboard from "./rutas/Dashboard";
import Iniciarsesion from "./rutas/Iniciarsesion";
import EditProfile from "./rutas/EditProfile";
import Registro from "./rutas/Registro";
import Inicio from "./rutas/Inicio";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/iniciarsesion" element={<Iniciarsesion/>}/>
          
          <Route element={<RutaProtegida />}>
            <Route path="/" element={<Inicio/>}/>
            <Route path="/editProfile/:id" element={<EditProfile/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
