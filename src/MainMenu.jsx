import { Canvas } from "@react-three/fiber";
import React from "react";
import MenuBackground from "./MenuBackground";

export default function MainMenu() {
  return (
    <div className="text-white w-full h-full">
      <Canvas>
        <MenuBackground />
      </Canvas>
    </div>
  );
}
