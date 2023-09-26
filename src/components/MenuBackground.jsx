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
  OrbitControls,
  useHelper,
  ContactShadows,
  Sky,
} from "@react-three/drei";
import * as THREE from "three";
import {
  EffectComposer,
  Vignette,
  Noise,
  Pixelation,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useControls } from "leva";
import { generatePerlinNoise } from "perlin-noise";

const material = new THREE.MeshMatcapMaterial({
  transparent: true,
});

export default function MenuBackground({ onLoad, setOnLoad }) {
  const { showAbout } = useContext(ViewContext);
  const directionalLightRef = useRef();
  const meshRef = useRef();
  const initialRender = useRef(true);

  const { viewport } = useThree();
  // const [matcapTexture] = useMatcapTexture("1A2461_3D70DB_2C3C8F_2C6CAC", 1024);
  const [matcapTexture] = useMatcapTexture("AC8942_432D19_6E4D27_5F3B1C", 256);
  // const [matcapTexture] = useMatcapTexture("8B892C_D4E856_475E2D_47360A", 256);
  // const [matcapTexture] = useMatcapTexture("E6BF3C_5A4719_977726_FCFC82", 1024);
  // const [matcapTexture] = useMatcapTexture("B62D33_E4868B_7E2D34_DD6469", 1024);
  // const [matcapTexture] = useMatcapTexture("2A4BA7_1B2D44_1F3768_233C81", 256);
  const texture = useTexture("./pictures/lake2.png");
  const depthMap = useTexture("./pictures/lake2-depth.png");

  // const { showLanding } = useContext(ViewContext);
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

  useEffect(() => {
    const ambienceSound = new Howl({
      src: ["./sounds/allstar.mp3"],
      volume: 0.3,
      loop: false,
      onplay: (id) => {
        const timeoutId = setTimeout(() => {
          ambienceSound.fade(0.08, 0, 2000, id);
          playNewInstance();
        }, 68000);

        timeouts.push(timeoutId);
      },
    });

    const playingInstances = [];
    const timeouts = [];

    const playNewInstance = () => {
      const newInstanceId = ambienceSound.play();
      playingInstances.push(newInstanceId);
      ambienceSound.fade(0, 0.3, 2000, newInstanceId);
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

  const minPeakY = -0.1;
  const maxPeakY = 0.01;

  const minPeakX = -0.3;
  const maxPeakX = 0.3;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const newY =
      (Math.sin(time * 1) * (maxPeakY - minPeakY) + (maxPeakY + minPeakY)) / 4;
    const newX =
      (Math.sin(time * 0.0) * (maxPeakX - minPeakX) + (maxPeakX + minPeakX)) /
      4;

    depthMaterial.current.uMouse = [newX, newY];

    if (meshRef.current) {
      meshRef.current.position.x = 0 + newX;
      meshRef.current.position.y = -2 + -newY;
    }

    if (isStarted) {
      if (textRef.current.scale.x > 0.1 && rename === false) {
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
      positionX: 2.0,
      positionY: -1.2,
      positionZ: 1,
      rotation: 0,
      opacity: 1,
      scaleY: 3.5,
      scaleX: 3.5,
    },
    to: {
      positionX: showAbout ? 1.0 : 2.0,
      positionY: showAbout ? -1.5 : -1.2,
      positionZ: 1,
      rotation: 0,
      opacity: 0,
      scaleY: 1,
      scaleX: 1,
    },
    config: { duration: 275 },
  });

  const [spring, set] = useSpring(() => ({
    scaleY: 1,
    scaleX: 1,
  }));

  const animateFall = () => {
    set({ scaleY: 3.5 });
    setTimeout(() => {
      material.opacity = 0.1;
    }, 75);
  };

  // useEffect(() => {
  //   if (!showLanding) {
  //     animateFall();
  //   }
  // }, [showLanding]);

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
  };

  const vClickHandler = () => {
    setVFlipped(!vFlipped);
    setDuration(250);
    setIsRotated(!isRotated);
    setIsFlippedDown(!isRotated && !isFlippedDown);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    vClickHandler();
  }, [showAbout]);

  // const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } =
  //   useControls("environment map", {
  //     envMapIntensity: { value: 1, min: 0, max: 12 },
  //     envMapHeight: { value: 7, min: 0, max: 100 },
  //     envMapRadius: { value: 28, min: 10, max: 1000 },
  //     envMapScale: { value: 100, min: 10, max: 1000 },
  //   });

  const sunPosition = [0.0, 1.16, -1.15];

  // useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
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
      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        // color={color}
        // opacity={opacity}
        // blur={blur}
        frames={1}
      />

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
                castShadow
                ref={firstLetterRef}
                material={material}
                font="./fonts/Gemstone_Regular.json"
                size={fontSize}
                height={0.2}
                curveSegments={2}
                bevelEnabled
                bevelThickness={0.2}
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
            castShadow
            material={material}
            font="./fonts/Gemstone_Regular.json"
            size={fontSize}
            height={0.2}
            curveSegments={2}
            bevelEnabled
            bevelThickness={0.2}
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

      <directionalLight
        ref={directionalLightRef}
        position={sunPosition}
        castShadow
      />

      <ambientLight intensity={0.5} />
      <Sky sunPosition={sunPosition} />

      <mesh
        ref={meshRef}
        receiveShadow
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeBufferGeometry attach="geometry" args={[10, 10]} />

        <shadowMaterial color="gold" transparent opacity={0.3} />
      </mesh>
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
