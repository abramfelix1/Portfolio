import { Canvas } from "@react-three/fiber";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuBackground from "./MenuBackground";

export default function MainMenu() {
  return (
    <div className="w-full h-full absolute">
      <AnimatePresence>
        <div className="text-white w-full h-full absolute z-[-1]">
          <Canvas>
            <MenuBackground />
          </Canvas>
        </div>
      </AnimatePresence>
      <div className="flex flex-col h-full text-white z-50 text-7xl font-bold gap-y-10 justify-center p-36">
        <div className="flex flex-col">
          <p>Projects</p>
          <div className="w-[200px] h-[2px] bg-gradient-to-r from-white mb-2"></div>
        </div>
        <div className="flex flex-col">
          <p>About Me</p>
          <div className="w-[200px] h-[2px] bg-gradient-to-r from-white mb-2"></div>
        </div>
        <div className="flex flex-col">
          <p>Contact</p>
          <div className="w-[200px] h-[2px] bg-gradient-to-r from-white mb-2"></div>
        </div>
      </div>
    </div>
  );
}
