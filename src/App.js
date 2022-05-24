import { BrowserRouter, Routes, Route } from "react-router-dom";
import RutaProtegida from "./componentes/rutaPrivada";
import { AuthProvider } from "./hooks/authContext";
import Iniciarsesion from "./rutas/Iniciarsesion";
import Inicio from "./rutas/Inicio";
import Registro from "./rutas/Registro";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/registro" element={<Registro/>}/>
          <Route path="/iniciarsesion" element={<Iniciarsesion/>}/>
          <Route element={<RutaProtegida />}>
            <Route path="/" element={<Inicio/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
