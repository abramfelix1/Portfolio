import { useEffect, useRef, useState } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import { useSpring, animated as a } from "@react-spring/three";
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

export default function Landing({ onLoad }) {
  const { viewport } = useThree();
  // const [matcapTexture] = useMatcapTexture("1A2461_3D70DB_2C3C8F_2C6CAC", 1024);
  const [matcapTexture] = useMatcapTexture("AC8942_432D19_6E4D27_5F3B1C", 1024);
  // const [matcapTexture] = useMatcapTexture("8B892C_D4E856_475E2D_47360A", 1024);
  // const [matcapTexture] = useMatcapTexture("B62D33_E4868B_7E2D34_DD6469", 1024);
  // const [matcapTexture] = useMatcapTexture("2A4BA7_1B2D44_1F3768_233C81", 1024);
  const texture = useTexture("./pictures/yellow.jpg");
  const depthMap = useTexture("./pictures/yellow-depth.png");

  const [isRotated, setIsRotated] = useState(false);
  const [isFlippedDown, setIsFlippedDown] = useState(false);

  const depthMaterial = useRef();
  const htmlRef = useRef();
  const vRef = useRef();

  useFrame((state, delta) => {
    depthMaterial.current.uMouse = [state.mouse.x * 0.01, state.mouse.y * 0.01];
  });

  useEffect(() => {
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [matcapTexture]);

  const rotationSpring = useSpring({
    from: { rotation: 0 },
    to: { rotation: isRotated ? Math.PI : 0 },
    config: { duration: 500 },
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
    config: { duration: 500 },
  });

  const textClickHandler = () => {
    setIsRotated(!isRotated);
    setIsFlippedDown(!isRotated && !isFlippedDown);
  };

  return (
    <>
      <color args={["#ffdf00"]} attach={"background"} />

      <EffectComposer>
        <Noise premultiply blendFunction={BlendFunction.SCREEN} />
        <Vignette
          offset={0.3} // vignette offset
          darkness={0.5} // vignette darkness
          blendFunction={BlendFunction.DARKEN}
        />
        {/* <Pixelation
          granularity={3} // pixel granularity
        /> */}
      </EffectComposer>

      <mesh
        position={[0, 0, -1]}
        onClick={(e) => {
          e.stopPropagation();
          console.log("BACKGROUND CLICK");
        }}
      >
        <Plane
          args={[1, 1]}
          scale={[viewport.width + 5, viewport.height + 5, 1]}
          rotation-z={Math.PI * 2}
        >
          <pseudo3DMaterial
            ref={depthMaterial}
            uImage={texture}
            uDepthMap={depthMap}
          />
        </Plane>
      </mesh>

      <mesh position={[-2.5, -1, 0]} onClick={textClickHandler}>
        <Float
          floatIntensity={1}
          floatingRange={[0.5, 0.5]}
          rotationIntensity={1.5}
          speed={1.25}
        >
          <a.group ref={vRef} rotation-x={rotationSpring.rotation}>
            <a.group
              position-y={positionSpring.positionY}
              position-z={positionSpring.positionZ}
            >
              <Text3D
                material={material}
                font="./fonts/Gemstone_Regular.json"
                size={1.25}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.3}
                bevelSize={0.1}
                bevelOffset={0.015}
                bevelSegments={25}
                letterSpacing={0.1}
              >
                V
              </Text3D>
            </a.group>
          </a.group>
          <Text3D
            material={material}
            font="./fonts/Gemstone_Regular.json"
            size={1.25}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.3}
            bevelSize={0.1}
            bevelOffset={0.015}
            bevelSegments={25}
            letterSpacing={0.1}
            position={[0.9, 0, 0]}
          >
            BRAM
          </Text3D>
        </Float>
      </mesh>

      <Html
        ref={htmlRef}
        center
        transform
        position={[0, -2.75, 0]}
        style={{ color: "white", fontSize: "5px" }}
        className="blink"
      >
        <div
          className="blink"
          onClick={(e) => {
            e.stopPropagation();
            console.log("CLICK TO START CLICK");
          }}
        >
          CLICK TO START
        </div>
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
