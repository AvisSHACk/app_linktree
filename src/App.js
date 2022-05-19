import { BrowserRouter, Routes, Route } from "react-router-dom";
import Iniciarsesion from "./rutas/Iniciarsesion";
import Inicio from "./rutas/Inicio";
import Registro from "./rutas/Registro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/iniciarsesion" element={<Iniciarsesion/>}/>
        <Route path="/" element={<Inicio/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
