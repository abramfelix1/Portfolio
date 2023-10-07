import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useSpring, animated as a } from "@react-spring/three";
import { Vector3 } from "three";

import { Howl } from "howler";

import {
  Text3D,
  Html,
  Float,
  shaderMaterial,
  useMatcapTexture,
  useTexture,
  Plane,
} from "@react-three/drei";
import * as THREE from "three";
import {
  EffectComposer,
  Vignette,
  Noise,
  Pixelation,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const material = new THREE.MeshMatcapMaterial();

export default function Landing({ onLoad, setOnLoad }) {
  const { viewport, size, camera, gl } = useThree();
  //   const [matcapTexture] = useMatcapTexture("1A2461_3D70DB_2C3C8F_2C6CAC", 1024);
  const [matcapTexture] = useMatcapTexture("AC8942_432D19_6E4D27_5F3B1C", 1024);
  //   const [matcapTexture] = useMatcapTexture("8B892C_D4E856_475E2D_47360A", 1024);
  //   const [matcapTexture] = useMatcapTexture("E6BF3C_5A4719_977726_FCFC82", 1024);
  //   const [matcapTexture] = useMatcapTexture("B62D33_E4868B_7E2D34_DD6469", 1024);
  //   const [matcapTexture] = useMatcapTexture("2A4BA7_1B2D44_1F3768_233C81", 1024);
  //   const texture = useTexture("./pictures/yellow.jpg");
  //   const depthMap = useTexture("./pictures/yellow-depth.png");

  const [isRotated, setIsRotated] = useState(false);
  const [isFlippedDown, setIsFlippedDown] = useState(false);
  const [vFlipped, setVFlipped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [rename, setRename] = useState(false);
  const [duration, setDuration] = useState(250);
  const [name, setName] = useState({
    first: "V",
    last: "BRAM",
  });

  const fontSize = 0.2;

  const textRef = useRef();
  const firstLetterRef = useRef();

  // Define position in normalized device coordinates
  const ndcPosition = new Vector3(0.85, -0.8, 0.9); // Bottom-right of the screen

  // Convert NDC to world coordinates
  const worldPosition = ndcPosition.unproject(camera);

  // const referenceSize = { width: 1920, height: 1080 };
  // const xOffset = (6.5 / referenceSize.width) * size.width;
  // const yOffset = (3.5 / referenceSize.height) * size.height;
  const xOffset = size.width * 0.9;
  const yOffset = size.height * -0.9;
  console.log(xOffset, yOffset);

  useEffect(() => {
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [matcapTexture]);

  useFrame(({ clock }) => {
    const delta = clock.getDelta();
    const normalizedDelta = Math.min(0.05, Math.max(0.041, delta));

    if (isStarted) {
      if (textRef.current.scale.x > 0.1 && rename === false) {
        textRef.current.scale.x -= delta + 0.05;

        if (textRef.current.scale.x < 0.1 && rename === false) {
          setRename(true);
        }
      }

      if (textRef.current.scale.x < 1 && rename === true) {
        textRef.current.scale.x += delta + 0.05;
        if (textRef.current.scale.x === 1 && rename === true) {
          setIsStarted(false);
          setRename(false);
        }
      }
    }
  });

  const rotationSpring = useSpring({
    from: { rotation: Math.PI },
    to: { rotation: isRotated ? Math.PI : 0 },
    config: { duration },
  });

  const positionSpring = useSpring({
    from: {
      positionY: 0,
      positionZ: 0,
    },
    to: {
      positionY: isFlippedDown ? -0.25 : 0,
      positionZ: isFlippedDown ? -0.2 : 0,
    },
    config: { duration },
  });

  const textClickHandler = () => {
    setIsStarted(true);
    setName((prevName) => {
      if (prevName.first === "V") {
        return {
          first: "F",
          last: "ELIX",
        };
      } else {
        return {
          first: "V",
          last: "BRAM",
        };
      }
    });
  };

  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(textClickHandler, 1000);
    setIntervalId(id);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const texture = useTexture("./pictures/toilet3.png");

  return (
    <group scale={[0.3525, 0.3525, 1]} position={worldPosition.toArray()}>
      <EffectComposer>
        <Noise
          premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
          opacity={0.7}
        />
        {/* <Vignette
          offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.DARKEN}
        /> */}
        <Pixelation granularity={0} />
      </EffectComposer>

      {/* <mesh position={[0, 0, -1]}>
        <Plane
          args={[1, 1]}
          scale={[7, 7, 1]}
          rotation-z={Math.PI * 2}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <pseudo3DMaterial uImage={texture} />
        </Plane>
      </mesh> */}

      <group
        ref={textRef}
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <a.group>
          <a.group
            position-y={positionSpring.positionY}
            position-z={positionSpring.positionZ}
          >
            <Text3D
              ref={firstLetterRef}
              material={material}
              font="./fonts/Gemstone_Regular.json"
              size={fontSize}
              height={0.02}
              curveSegments={2}
              bevelEnabled
              bevelThickness={0.003}
              bevelSize={0.01}
              bevelOffset={0.0015}
              bevelSegments={25}
              letterSpacing={0.01}
              position={[-0.14, 0, 0]}
              onClick={(e) => {
                e.stopPropagation();
                // if (name.first === "V") vClickHandler();
              }}
            >
              {name.first}
            </Text3D>
          </a.group>
        </a.group>
        <Text3D
          material={material}
          font="./fonts/Gemstone_Regular.json"
          size={fontSize}
          height={0.02}
          curveSegments={2}
          bevelEnabled
          bevelThickness={0.003}
          bevelSize={0.001}
          bevelOffset={0.0015}
          bevelSegments={25}
          letterSpacing={0.01}
          position={[0, 0, 0]}
        >
          {name.last}
        </Text3D>
      </group>
    </group>
  );
}
