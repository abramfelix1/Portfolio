import { useEffect, useRef } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import {
  useMatcapTexture,
  Text3D,
  Html,
  Float,
  Center,
  Stage,
  Plane,
  shaderMaterial,
  useTexture,
} from "@react-three/drei";
import { Noise, EffectComposer } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  const { viewport } = useThree();
  const [matcapTexture] = useMatcapTexture("1A2461_3D70DB_2C3C8F_2C6CAC", 512);
  const texture = useTexture("./pictures/yellow.jpg");
  const depthMap = useTexture("./pictures/yellow-depth.png");

  const depthMaterial = useRef();
  const htmlRef = useRef();

  useFrame(
    (state) =>
      (depthMaterial.current.uMouse = [
        state.mouse.x * 0.01,
        state.mouse.y * 0.01,
      ])
  );

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  return (
    <>
      <color args={["#ffdf00"]} attach={"background"} />
      <EffectComposer>
        <Noise premultiply blendFunction={BlendFunction.ADD} />
      </EffectComposer>

      <Plane
        args={[1, 1]}
        scale={[viewport.width + 5, viewport.height + 5, 1]}
        position={[0, 0, -1]}
        rotation-z={Math.PI * 2}
      >
        <pseudo3DMaterial
          ref={depthMaterial}
          uImage={texture}
          uDepthMap={depthMap}
        />
      </Plane>

      <mesh position={[0, -1, 0]}>
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
      </mesh>

      <Html
        ref={htmlRef}
        center
        transform
        position={[0, -2.75, 0]}
        style={{ color: "white", fontSize: "5px" }}
        className="blink"
      >
        <div className="blink" onClick={() => console.log("AAAAAAAAAAAAA")}>
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
