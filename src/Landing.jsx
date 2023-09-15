import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useSpring, animated as a } from "@react-spring/three";
import { animated } from "react-spring";

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
  Texture,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const material = new THREE.MeshMatcapMaterial();

export default function Landing({ onLoad, setOnLoad }) {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  const fadeStyles = useSpring({
    opacity: fade ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 400 },
    onRest: () => {
      if (fade) {
        navigate("/home");
      }
    },
  });

  const handleStartClick = () => {
    navigate("/home");
  };

  const { viewport } = useThree();
  // const [matcapTexture] = useMatcapTexture("1A2461_3D70DB_2C3C8F_2C6CAC", 1024);
  // const [matcapTexture] = useMatcapTexture("AC8942_432D19_6E4D27_5F3B1C", 1024);
  const [matcapTexture] = useMatcapTexture("8B892C_D4E856_475E2D_47360A", 1024);
  // const [matcapTexture] = useMatcapTexture("B62D33_E4868B_7E2D34_DD6469", 1024);
  // const [matcapTexture] = useMatcapTexture("2A4BA7_1B2D44_1F3768_233C81", 1024);
  const texture = useTexture("./pictures/yellow.jpg");
  const depthMap = useTexture("./pictures/yellow-depth.png");

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

  const fontSize = 1.2;

  const depthMaterial = useRef();
  const htmlRef = useRef();
  const textRef = useRef();
  const firstLetterRef = useRef();

  useFrame((state, delta) => {
    depthMaterial.current.uMouse = [state.mouse.x * 0.01, state.mouse.y * 0.01];

    if (isStarted) {
      if (textRef.current.scale.x > 0.1 && rename === false) {
        // textRef.current.position.x = 0.1;

        textRef.current.scale.x -= 0.05;

        if (textRef.current.scale.x < 0.1 && rename === false) {
          setRename(true);
        }
      }

      if (textRef.current.scale.x < 1 && rename === true) {
        textRef.current.scale.x += 0.05;
        if (textRef.current.scale.x === 1 && rename === true) {
          setIsStarted(false);
          setRename(false);
        }
      }
    }
  });

  useEffect(() => {
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [matcapTexture]);

  const rotationSpring = useSpring({
    from: { rotation: 0 },
    to: { rotation: isRotated ? Math.PI : 0 },
    config: { duration },
  });

  const positionSpring = useSpring({
    from: {
      positionY: 0,
      positionZ: 0,
    },
    to: {
      positionY: isFlippedDown ? -1.2 : 0,
      positionZ: isFlippedDown ? -0.2 : 0,
    },
    config: { duration },
  });

  const textClickHandler = () => {
    setIsStarted(true);
    if (name.first === "V") {
      if (isRotated) {
        setDuration(0);
        setIsRotated(!isRotated);
        setIsFlippedDown(!isRotated && !isFlippedDown);
      }
      setName({
        first: "F",
        last: "ELIX",
      });
      textRef.current.position.set(0.9, -1.0, -0.2);
    } else {
      if (vFlipped) {
        setDuration(0);
        setIsRotated(!isRotated);
        setIsFlippedDown(!isRotated && !isFlippedDown);
      }
      setName({
        first: "V",
        last: "BRAM",
      });
      textRef.current.position.set(0.55, -1.0, -0.2);
    }
  };

  const vClickHandler = () => {
    setVFlipped(!vFlipped);
    setDuration(250);
    setIsRotated(!isRotated);
    setIsFlippedDown(!isRotated && !isFlippedDown);
  };

  return (
    <>
      <color args={["#ffdf00"]} attach={"background"} />

      <EffectComposer>
        <Noise
          premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
          opacity={0.4}
        />
        <Vignette
          // offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.DARKEN}
        />
        <Pixelation granularity={3} />
      </EffectComposer>

      <mesh position={[0, 0, -1]}>
        <Plane
          args={[1, 1]}
          scale={[viewport.width + 5, viewport.height + 5, 1]}
          rotation-z={Math.PI * 2}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <pseudo3DMaterial
            ref={depthMaterial}
            uImage={texture}
            uDepthMap={depthMap}
          />
        </Plane>
      </mesh>

      <group
        ref={textRef}
        position={[0.5, -1, 0]}
        onClick={(e) => {
          e.stopPropagation();
          textClickHandler();
        }}
      >
        <Float
          floatIntensity={1}
          floatingRange={[0.5, 0.5]}
          rotationIntensity={1.5}
          speed={1.25}
        >
          <a.group rotation-x={rotationSpring.rotation}>
            <a.group
              position-y={positionSpring.positionY}
              position-z={positionSpring.positionZ}
            >
              <Text3D
                ref={firstLetterRef}
                material={material}
                font="./fonts/Gemstone_Regular.json"
                size={fontSize}
                height={0.2}
                curveSegments={2}
                bevelEnabled
                bevelThickness={0.3}
                bevelSize={0.1}
                bevelOffset={0.015}
                bevelSegments={25}
                letterSpacing={0.1}
                position={[-2.8, 0, 0]}
                onClick={(e) => {
                  e.stopPropagation();
                  if (name.first === "V") vClickHandler();
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
            height={0.2}
            curveSegments={2}
            bevelEnabled
            bevelThickness={0.3}
            bevelSize={0.1}
            bevelOffset={0.015}
            bevelSegments={25}
            letterSpacing={0.1}
            position={[-1.9, 0, 0]}
          >
            {name.last}
          </Text3D>
        </Float>
      </group>

      <Html
        ref={htmlRef}
        center
        transform
        position={[0, -2.5, 0]}
        style={{ color: "white", fontSize: "6px", userSelect: "none" }}
        className="blink"
      >
        <p
          onClick={() => {
            handleStartClick();
            // vClickHandler();
          }}
        >
          CLICK TO START
        </p>
      </Html>

      <Html ref={htmlRef} center transform position={[0, -3.5, 0]}>
        <p style={{ color: "white", fontSize: "5px", userSelect: "none" }}>
          {" "}
          © 2023 ABRAM FELIX PORTFOLIO
        </p>
      </Html>
    </>
  );
}

extend({
  Pseudo3DMaterial: shaderMaterial(
    { uMouse: [0, 0], uImage: null, uDepthMap: null },
    `
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,
    `
      precision mediump float;

      uniform vec2 uMouse;
      uniform sampler2D uImage;
      uniform sampler2D uDepthMap;

      varying vec2 vUv;

      vec4 linearTosRGB( in vec4 value ) {
        return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
      }


      void main() {
         vec4 depthDistortion = texture2D(uDepthMap, vUv);
         float parallaxMult = depthDistortion.r;

         vec2 parallax = (uMouse) * parallaxMult;

         vec4 original = texture2D(uImage, (vUv + parallax));
         gl_FragColor = linearTosRGB(original);
      }
      `
  ),
});
