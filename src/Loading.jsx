import React from "react";
import { useFrame, useThree, extend, Canvas } from "@react-three/fiber";
import LoadingIcon from "./LoadingIcon";

export default function Loading() {
  return (
    <div className="w-full h-full bg-black">
      <div className="w-full h-full">
        <Canvas alpha={true}>
          <LoadingIcon />
        </Canvas>
      </div>
    </div>
  );
}
