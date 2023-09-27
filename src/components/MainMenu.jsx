import { Canvas } from "@react-three/fiber";
import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuBackground from "./MenuBackground";
import { Howl } from "howler";
import { ViewContext } from "../context/ViewContext";

export default function MainMenu() {
  const [hovered, setHovered] = useState(null);
  const { setShowProjects, showAbout, setShowAbout, setShowContact } =
    useContext(ViewContext);

  const menuNav = new Howl({
    src: ["./sounds/menuNav.mp3"],
    volume: 0.1,
    loop: false,
  });
  menuNav.seek(0.25);

  const menuClick = new Howl({
    src: ["./sounds/menuClick.mp3"],
    volume: 0.2,
    loop: false,
  });

  return (
    <div className="w-full h-full absolute">
      <AnimatePresence>
        <div className="text-white w-full h-full absolute z-[-1] pointer-events-auto">
          <Canvas shadows={"soft"}>
            <MenuBackground />
          </Canvas>
        </div>
      </AnimatePresence>
      <div className="flex flex-col h-full text-white z-40 text-7xl font-bold gap-y-10 justify-center py-36 select-none">
        {!showAbout && (
          <div className="flex flex-col relative px-36">
            <p
              onClick={() => {
                menuClick.play();
                setShowProjects(true);
                setHovered(null);
              }}
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
        )}
        {!showAbout && (
          <div className="flex flex-col relative px-36">
            <p
              onClick={() => {
                menuClick.play();
                setShowAbout(true);
                setHovered(null);
              }}
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
        )}
        {!showAbout && (
          <div className="flex flex-col relative px-36">
            <p
              onClick={() => {
                menuClick.play();
                setShowContact(true);
                setHovered(null);
              }}
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
        )}
        {hovered && (
          <div className="flex items-center justify-between w-full text-white bg-[rgb(0,0,0,0.3)] absolute select-none pointer-events-none bottom-10 p-2 px-10">
            <p className="font-normal text-3xl">
              {hovered === "Projects" && "Browse my projects."}
              {hovered === "About" && "Learn about my origin story."}
              {hovered === "Contact" && "Find ways to contact me."}
            </p>
            <p className="font-normal text-xl"> Click to Continue</p>
          </div>
        )}
      </div>
    </div>
  );
}
