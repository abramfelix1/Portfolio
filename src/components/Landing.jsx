import { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useSpring, animated as a } from "@react-spring/three";
import { Howl } from "howler";
import { ViewContext } from "../context/ViewContext";

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

const material = new THREE.MeshMatcapMaterial({
  transparent: true,
});

export default function Landing({ onLoad, setOnLoad }) {
  const { viewport } = useThree();
  // const [matcapTexture] = useMatcapTexture("1A2461_3D70DB_2C3C8F_2C6CAC", 1024);
  const [matcapTexture] = useMatcapTexture("AC8942_432D19_6E4D27_5F3B1C", 256);
  // const [matcapTexture] = useMatcapTexture("8B892C_D4E856_475E2D_47360A", 1024);
  // const [matcapTexture] = useMatcapTexture("E6BF3C_5A4719_977726_FCFC82", 1024);
  // const [matcapTexture] = useMatcapTexture("B62D33_E4868B_7E2D34_DD6469", 1024);
  // const [matcapTexture] = useMatcapTexture("2A4BA7_1B2D44_1F3768_233C81", 1024);
  const texture = useTexture("./pictures/yellow.jpg");
  const depthMap = useTexture("./pictures/yellow-depth.png");

  const { showLanding } = useContext(ViewContext);
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

  const fontSize = 0.9;

  const interactSound = new Howl({
    src: ["./sounds/logoInteract.mp3"],
    volume: 0.65,
  });

  useEffect(() => {
    const ambienceSound = new Howl({
      src: ["./sounds/wind.wav"],
      volume: 0.25,
      loop: false,
      onplay: (id) => {
        const timeoutId = setTimeout(() => {
          ambienceSound.fade(0.1, 0, 2000, id);
          playNewInstance();
        }, 26000);

        timeouts.push(timeoutId);
      },
    });

    const playingInstances = [];
    const timeouts = [];

    const playNewInstance = () => {
      const newInstanceId = ambienceSound.play();
      playingInstances.push(newInstanceId);
      ambienceSound.fade(0, 0.25, 2000, newInstanceId);
    };

    playNewInstance();

    return () => {
      playingInstances.forEach((id) => ambienceSound.stop(id));

      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, []);

  const depthMaterial = useRef();
  const htmlRef = useRef();
  const textRef = useRef();
  const materialRef = useRef();
  const firstLetterRef = useRef();

  const frequency = 0.01;
  const amplitude = 1;

  const minPeakY = -0.05;
  const maxPeakY = 0.05;

  const minPeakX = -0.3;
  const maxPeakX = 0.3;
  let previousTime = 0;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const delta = clock.getDelta();
    const normalizedDelta = Math.min(0.05, Math.max(0.041, delta));

    const newY =
      (Math.sin(time * 0.1) * (maxPeakY - minPeakY) + (maxPeakY + minPeakY)) /
      2;
    const newX =
      (Math.sin(time * 0.055) * (maxPeakX - minPeakX) + (maxPeakX + minPeakX)) /
      2;

    depthMaterial.current.uMouse = [newX, newY];

    const scaleChangeRate = 0.85;

    if (isStarted) {
      if (textRef.current.scale.x > 0.1 && rename === false) {
        if (textRef.current.scale.x >= 1 && rename === true) {
          setIsStarted(false);
          setRename(false);
          previousTime = 0;
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

  const vPositionSpring = useSpring({
    from: {
      positionY: 0,
      positionZ: 0,
    },
    to: {
      positionY: isFlippedDown ? -0.9 : 0,
      positionZ: isFlippedDown ? -0.2 : 0,
    },
    config: { duration },
  });

  const textPositionSpring = useSpring({
    from: {
      positionX: 0.8,
      positionY: -0.7,
      positionZ: 1,
      rotation: 0,
      opacity: 1,
    },
    to: {
      positionX: 0.8,
      positionY: showLanding ? -0.7 : -12,
      positionZ: showLanding ? 1 : 1,
      rotation: showLanding ? 0 : -Math.PI,
      opacity: 0,
    },
    config: { duration: 475 },
  });

  const [spring, set] = useSpring(() => ({
    scaleY: 1,
    scaleX: 1,
  }));

  const animateFall = () => {
    set({ scaleY: 3.5 });
    setTimeout(() => {
      material.opacity = 0.1;
    }, 135);
  };

  useEffect(() => {
    if (!showLanding) {
      animateFall();
    }
  }, [showLanding]);

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
      textRef.current.position.set(1.2, -0.7, 1);
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
      textRef.current.position.set(0.85, -0.7, 1);
    }
    interactSound.play();
  };

  const vClickHandler = () => {
    setVFlipped(!vFlipped);
    setDuration(250);
    setIsRotated(!isRotated);
    setIsFlippedDown(!isRotated && !isFlippedDown);
    interactSound.play();
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
          offset={0.3}
          darkness={0.5}
          blendFunction={BlendFunction.DARKEN}
        />
        <Pixelation granularity={2} />
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

      <a.group
        ref={textRef}
        position-x={textPositionSpring.positionX}
        position-y={textPositionSpring.positionY}
        position-z={textPositionSpring.positionZ}
        scale-x={spring.scaleX}
        scale-y={spring.scaleY}
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
              position-y={vPositionSpring.positionY}
              position-z={vPositionSpring.positionZ}
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
                position={[-2.6, 0, 0]}
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
      </a.group>
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
