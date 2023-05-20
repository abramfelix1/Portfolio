import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
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
          floatingRange={[1, 1]}
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
      <Html>
        <div
          style={{
            position: "absolute",
            width: "200px",
            top: "400px",
            right: "-155px",
            color: "white",
          }}
          onClick={() => console.log("A")}
        >
          CLICK TO START
        </div>
      </Html>
    </>
  );
}
