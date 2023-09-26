import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Landing from "./components/Landing.jsx";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main.jsx";

const root = document.getElementById("root");

function App() {
  const [onLoad, setOnLoad] = useState(true);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
