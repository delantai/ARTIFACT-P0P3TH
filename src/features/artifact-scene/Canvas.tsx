import { useState } from 'react';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import {
  ContactShadows,
  Environment as DreiEnvironment,
  Lightformer,
  PerspectiveCamera,
  PresentationControls,
  OrbitControls,
} from '@react-three/drei';

import { Artifact } from './artifact';
import { ArtifactState } from './artifact/constants';
import { Effects } from './Effects';

const Environment = () => (
  <DreiEnvironment resolution={512}>
    {/* Ceiling */}
    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
    <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
    {/* Sides */}
    <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
    <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
    {/* Key */}
    <Lightformer
      form="ring"
      color="red"
      intensity={10}
      scale={2}
      position={[10, 5, 10]}
      onUpdate={(self) => self.lookAt(0, 0, 0)}
    />
  </DreiEnvironment>
);

export const Canvas = () => {
  const [artifactState, setArtifactState] = useState<ArtifactState>(ArtifactState.Closed);

  return (
    <FiberCanvas
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 10, 15], fov: 25 }}>
      <color attach="background" args={['#15151a']} />
      <Artifact />
      {/* <PerspectiveCamera
        aspect={16 / 9}
        fov={25}
        makeDefault
        position={[0, 2.5, 15]}
        rotation={[-Math.PI / 32, 0, 0]}
      /> */}
      {/* <PresentationControls
        config={{ mass: 1, tension: 80, friction: 12 }}
        cursor={false}
        speed={1.5}
        global
        polar={[0, 0]}
        zoom={0.8}>
        <Artifact />
      </PresentationControls> */}
      <hemisphereLight intensity={0.5} />
      <ContactShadows
        resolution={1024}
        frames={1}
        position={[0, -1.16, 0]}
        scale={15}
        blur={0.5}
        opacity={1}
        far={20}
      />
      {/* <mesh scale={4} position={[3, -1.161, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
        <ringGeometry args={[0.9, 1, 4, 1]} />
        <meshStandardMaterial color="white" roughness={0.75} />
      </mesh>
      <mesh scale={4} position={[-3, -1.161, -1]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
        <ringGeometry args={[0.9, 1, 3, 1]} />
        <meshStandardMaterial color="white" roughness={0.75} />
      </mesh> */}
      <Environment />
      {/* <Effects /> */}
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />
    </FiberCanvas>
  );
};
