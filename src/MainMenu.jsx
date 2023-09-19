import { Canvas } from "@react-three/fiber";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuBackground from "./MenuBackground";

export default function MainMenu() {
  return (
    <AnimatePresence>
      <motion.div
        key="menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1.5 } }}
        className="text-white w-full h-full absolute"
      >
        <Canvas>
          <MenuBackground />
        </Canvas>
      </motion.div>
    </AnimatePresence>
  );
}
