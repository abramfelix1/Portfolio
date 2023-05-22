import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Landing from "./Landing.jsx";

const root = document.getElementById("root");

function App() {
  const [onLoad, setOnLoad] = useState(true);

  return (
    <>
      <Canvas eventPrefix="client" eventSource={root}>
        {onLoad && <Landing onLoad={onLoad} setOnLoad={setOnLoad} />}
      </Canvas>
    </>
  );
}

export default App;
