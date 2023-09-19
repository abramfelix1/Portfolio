import React, { useContext, useEffect, useState } from "react";
import Landing from "./Landing";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import Loading from "./Loading";
import { ViewContext } from "./context/ViewContext";
import MainMenu from "./MainMenu";

export default function Main() {
  const {
    showLanding,
    setShowLanding,
    showLoading,
    setShowLoading,
    showMainMenu,
  } = useContext(ViewContext);
  const [showStart, setShowStart] = useState(true);

  const handleExit = () => {
    startSound.play();
    setShowStart(false);
    setTimeout(() => {
      setShowLanding(false);
      setShowLoading(true);
    }, 350);
  };

  const startSound = new Howl({
    src: ["./sounds/start.mp3"],
    volume: 0.1,
    loop: false,
  });

  return (
    <div className="flex relative w-screen h-screen">
      <AnimatePresence>
        {showLanding && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="flex relative justify-center w-full h-full"
          >
            <div className="flex flex-grow flex-col items-center absolute bottom-0 gap-y-32 p-2 select-none">
              {showStart && (
                <p
                  className="blink text-white text-xs z-50"
                  onClick={handleExit}
                >
                  CLICK TO START
                </p>
              )}
              <p className="text-white text-xs z-50 select-none pointer-events-none">
                © 2023 ABRAM FELIX PORTFOLIO
              </p>
            </div>
            <Canvas>
              <Landing />
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
      {showLoading && <Loading />}
      {showMainMenu && <MainMenu />}
    </div>
  );
}
