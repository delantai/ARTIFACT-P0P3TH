// Vendor
import { ComponentProps, useRef } from 'react';
import * as THREE from 'three';
import { animated } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Helpers
import { DreiGLTF } from 'src/@types';

// Module
import { CUBE_LOC } from './constants';

const ASSET_PATH = '/assets/threejs/artifact-solid.glb';

type Props = ComponentProps<typeof animated.group>;

export const ArtifactSolid = ({ ...props }: Props) => {
  const cubeRef = useRef<THREE.Mesh<THREE.BufferGeometry>>(null);
  const { nodes } = useGLTF(ASSET_PATH) as DreiGLTF;

  // Add resting animation
  useFrame(({ clock }) => {
    if (cubeRef.current) {
      const t = clock.getElapsedTime();
      cubeRef.current.position.y = THREE.MathUtils.lerp(
        cubeRef.current.position.y,
        CUBE_LOC.position[1] + Math.sin(t) / 5,
        0.01,
      );
    }
  });

  return (
    <animated.group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} position={CUBE_LOC.position} ref={cubeRef} rotation={CUBE_LOC.rotation}>
        <meshStandardMaterial color="orange" />
      </mesh>
    </animated.group>
  );
};

useGLTF.preload(ASSET_PATH);
