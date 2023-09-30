import React, { useContext, useEffect, useState } from "react";
import { useFrame, useThree, extend, Canvas } from "@react-three/fiber";
import LoadingIcon from "./LoadingIcon.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContext } from "../context/ViewContext";

export default function Loading() {
  const [showLoadingIcon, setShowLoadingIcon] = useState(true);
  const { setShowMainMenu, setShowLoading } = useContext(ViewContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingIcon(false);
    }, 4000);
    const timer2 = setTimeout(() => {
      setShowMainMenu(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [setShowLoadingIcon, setShowMainMenu]);

  const handleContinue = () => {
    if (!showLoadingIcon) {
      setShowLoading(false);
    }
  };

  return (
    <div
      className="flex w-full h-full relative bg-black"
      onClick={handleContinue}
    >
      {showLoadingIcon ? (
        <div className="w-full h-full absolute bottom-8 z-50">
          (
          <Canvas alpha={true}>
            <LoadingIcon />
          </Canvas>
          )
        </div>
      ) : (
        <div className="absolute right-0 bottom-8 pr-8 z-50 select-none">
          <p className="blink text-white">Click Anywhere to Continue</p>
        </div>
      )}
      <div className="flex flex-col relative w-full h-full justify-end px-20 pb-36 text-white z-40 bg-black select-none">
        <img
          src={"./pictures/toilet5.png"}
          alt="asdf"
          className="w-[100%] h-[100%] absolute scale-100 z-[-50] bottom-0 select-none pointer-events-none "
        />
        <motion.div
          key="border"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1, transition: { duration: 8 } }}
          className="h-[2px] w-[60%] bg-gradient-to-r from-white mb-2"
        />
        <p>Welcome to my portfolio! Sorry if its too loud.</p>
      </div>
    </div>
  );
}
