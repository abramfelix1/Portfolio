import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

const root = document.getElementById("root");

function App() {
  return (
    <>
      <Canvas eventPrefix="client" eventSource={root}>
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
