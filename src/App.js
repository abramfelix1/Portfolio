import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Landing from "./Landing.jsx";
import { Routes, Route } from "react-router-dom";
import Menu from "./Loading.jsx";
import Main from "./Main.jsx";

const root = document.getElementById("root");

function App() {
  const [onLoad, setOnLoad] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/home" element={<Menu />} />
    </Routes>
  );
}

export default App;
