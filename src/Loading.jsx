import React, { useContext, useEffect } from "react";
import { useFrame, useThree, extend, Canvas } from "@react-three/fiber";
import LoadingIcon from "./LoadingIcon";
import { motion, AnimatePresence } from "framer-motion";
import { ViewContext } from "./context/ViewContext";

export default function Loading() {
  const { showLoading, setShowLoading } = useContext(ViewContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [setShowLoading]);

  return (
    <div className="flex w-full h-full relative bg-black">
      {showLoading ? (
        <div className="w-full h-full absolute bottom-8">
          (
          <Canvas alpha={true}>
            <LoadingIcon />
          </Canvas>
          )
        </div>
      ) : (
        <div className="absolute right-0 bottom-8 pr-8">
          <p className="blink text-white">Click to continue</p>
        </div>
      )}
      <div className="flex flex-col relative w-full h-full justify-end px-20 pb-36 text-white z-50">
        <img
          src={"./pictures/toilet5.png"}
          alt="asdf"
          className="w-[100%] h-[100%] absolute scale-100 z-[-50] bottom-0"
        />
        <motion.div
          key="border"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1, transition: { duration: 8 } }}
          className="h-[2px] w-[60%] bg-gradient-to-r from-white mb-2"
        />
        <p>Welcome to my portfolio! More Stuff Here...</p>
      </div>
    </div>
  );
}
