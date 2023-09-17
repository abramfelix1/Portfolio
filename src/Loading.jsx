import React from "react";
import { useFrame, useThree, extend, Canvas } from "@react-three/fiber";
import LoadingIcon from "./LoadingIcon";

export default function Loading() {
  return (
    <div className="flex w-full h-full relative bg-black">
      <div className="w-full h-full absolute bottom-0">
        <Canvas alpha={true}>
          <LoadingIcon />
        </Canvas>
      </div>
    </div>
  );
}
