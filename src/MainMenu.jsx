import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuBackground from "./MenuBackground";

export default function MainMenu() {
  const [hovered, setHovered] = useState();

  return (
    <div className="w-full h-full absolute">
      <AnimatePresence>
        <div className="text-white w-full h-full absolute z-[-1]">
          <Canvas shadows={"soft"}>
            <MenuBackground />
          </Canvas>
        </div>
      </AnimatePresence>
      <div className="flex flex-col h-full text-white z-50 text-7xl font-bold gap-y-10 justify-center p-36 select-none">
        <div className="flex flex-col relative">
          <p>Projects</p>
          <div className="w-[350px] h-[2px] bg-gradient-to-r from-white mb-2 absolute bottom-[-10px]"></div>
        </div>
        <div className="flex flex-col relative">
          <p>About Me</p>
          {/* <div className="w-[200px] h-[2px] bg-gradient-to-r from-white mb-2"></div> */}
        </div>
        <div className="flex flex-col relative">
          <p>Contact</p>
          {/* <div className="w-[200px] h-[2px] bg-gradient-to-r from-white mb-2"></div> */}
        </div>
      </div>
    </div>
  );
}
