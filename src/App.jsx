import "./App.css";

import Risultati from "./components/Risultati.jsx";
import Dettagli from "./components/Dettagli.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNav from "./components/MyNav.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <Routes>
          <Route path="/" element={<Risultati />} />
          <Route path="/dettagli/:lat/:lon" element={<Dettagli />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
