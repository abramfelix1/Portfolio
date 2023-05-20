import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  useMatcapTexture,
  Text3D,
  Html,
  Float,
  Center,
  Stage,
} from "@react-three/drei";
import * as THREE from "three";

const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const [matcapTexture] = useMatcapTexture("1A2461_3D70DB_2C3C8F_2C6CAC", 512);

  const htmlRef = useRef();

  useFrame((state, delta) => {
    const time = (state.clock.elapsedTime % 1) + 0.5;
    // htmlRef.current.opacity = time >= 1 ? 0 : 100;
  });

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  return (
    <>
      <color args={["#ffdf00"]} attach={"background"}></color>
      <Stage
        shadows={{ type: "contact", opacity: 0.0, blur: 3 }}
        environment="sunset"
        preset="portrait"
        intensity={1}
      >
        <Float
          floatIntensity={1}
          floatingRange={[0.5, 0.5]}
          rotationIntensity={1.5}
          speed={1.5}
        >
          <Center top>
            <Text3D
              material={material}
              font="./fonts/Gemstone_Regular.json"
              size={1.25}
              height={0.2}
              curveSegments={48}
              bevelEnabled
              bevelThickness={0.1}
              bevelSize={0.1}
              bevelOffset={0.01}
              bevelSegments={5}
              letterSpacing={0.1}
            >
              VBRAM
            </Text3D>
          </Center>
        </Float>
      </Stage>
      <Html
        ref={htmlRef}
        center
        transform
        position={[0, -2.5, 0]}
        style={{ color: "white", fontSize: "5px" }}
        className="blink"
      >
        <div onClick={() => console.log("AAAAAAAAAAAAA")}>CLICK TO START</div>
      </Html>
    </>
  );
}
