import React, { useEffect, useState } from "react";
import Landing from "./Landing";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import Loading from "./Loading";

export default function Main() {
  const [showLanding, setShowLanding] = useState(true);

  const handleExit = () => {
    startSound.play();
    setTimeout(() => {
      setShowLanding(false);
    }, 250);
  };

  const startSound = new Howl({
    src: ["./sounds/start.mp3"],
    volume: 0.1,
    loop: false,
  });

  return (
    <div className="flex relative w-screen h-screen bg-black">
      <AnimatePresence>
        {showLanding ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            onAnimationComplete={() => console.log("Animation completed")}
            className="flex relative justify-center w-full h-full"
          >
            <div className="flex flex-grow flex-col items-center absolute bottom-0 gap-y-32 p-2 select-none">
              <p className="blink text-white text-xs z-50" onClick={handleExit}>
                CLICK TO START
              </p>
              <p className="text-white text-xs z-50 select-none pointer-events-none">
                © 2023 ABRAM FELIX PORTFOLIO
              </p>
            </div>
            <Canvas>
              <Landing />
            </Canvas>
          </motion.div>
        ) : (
          <Loading />
        )}
      </AnimatePresence>
    </div>
  );
}
