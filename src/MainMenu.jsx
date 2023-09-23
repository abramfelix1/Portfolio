import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuBackground from "./MenuBackground";
import { Howl } from "howler";

export default function MainMenu() {
  const [hovered, setHovered] = useState();

  const menuNav = new Howl({
    src: ["./sounds/menuNav.mp3"],
    volume: 0.1,
    loop: false,
  });

  menuNav.seek(0.2);

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
          <p
            onMouseEnter={() => {
              setHovered("Projects");
              menuNav.play();
            }}
            onMouseLeave={() => setHovered(null)}
            className="w-fit"
          >
            Projects
          </p>
          {hovered === "Projects" && (
            <div className="w-[350px] h-[2px] bg-gradient-to-r from-white mb-2 absolute bottom-[-10px] pointer-events-none"></div>
          )}
        </div>
        <div className="flex flex-col relative">
          <p
            onMouseEnter={() => {
              setHovered("About");
              menuNav.play();
            }}
            onMouseLeave={() => setHovered(null)}
            className="w-fit"
          >
            About Me
          </p>
          {hovered === "About" && (
            <div className="w-[350px] h-[2px] bg-gradient-to-r from-white mb-2 absolute bottom-[-10px] pointer-events-none"></div>
          )}
        </div>
        <div className="flex flex-col relative">
          <p
            onMouseEnter={(e) => {
              e.stopPropagation();
              setHovered("Contact");
              menuNav.play();
            }}
            onMouseLeave={() => setHovered(null)}
            className="w-fit"
          >
            Contact
          </p>
          {hovered === "Contact" && (
            <div className="w-[350px] h-[2px] bg-gradient-to-r from-white mb-2 absolute bottom-[-10px] pointer-events-none"></div>
          )}
        </div>
      </div>
    </div>
  );
}
