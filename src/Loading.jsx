import React from "react";
import { useFrame, useThree, extend, Canvas } from "@react-three/fiber";
import LoadingIcon from "./LoadingIcon";
import { motion, AnimatePresence } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex w-full h-full relative bg-black">
      <div className="w-full h-full absolute bottom-0">
        <Canvas alpha={true}>
          <LoadingIcon />
        </Canvas>
      </div>
      <div className="flex flex-col relative w-full h-full justify-end px-20 pb-20 text-white z-50">
        <img
          src={"./pictures/toilet4.png"}
          alt="asdf"
          className="w-[100%] h-[100%] absolute scale-100 z-[-50] bottom-0"
        />
        <motion.div
          key="border"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1, transition: { duration: 10 } }}
          className="h-[2px] w-[60%] bg-gradient-to-r from-white mb-2"
        ></motion.div>
        <p>Welcome to my portfolio! </p>
      </div>
    </div>
  );
}
