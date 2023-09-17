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
      <div className="flex flex-col w-full h-full justify-end p-20 text-white">
        <motion.div
          key="border"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1, transition: { duration: 10 } }}
          className="h-[1px] w-[60%] bg-gradient-to-r from-white"
        />
        <p>Welcome to my portfolio! </p>
      </div>
    </div>
  );
}
