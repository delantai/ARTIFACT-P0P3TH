// Vendor
import { ComponentProps, useRef } from 'react';
import * as THREE from 'three';
import { animated } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Helpers
import { useAnimBobbing } from 'src/utils/threejs/use-anim-bobbing';
import { DreiGLTF } from 'src/@types';

// Module
import { CUBE_LOC, materials } from './constants';

const ASSET_PATH = '/assets/threejs/artifact-solid.glb';

type Props = ComponentProps<typeof animated.group>;

export const ArtifactSolid = ({ ...props }: Props) => {
  const cubeRef = useRef<THREE.Mesh<THREE.BufferGeometry>>(null);
  const { nodes } = useGLTF(ASSET_PATH) as DreiGLTF;

  // Add resting animation
  const bobbing = useAnimBobbing({ origin: CUBE_LOC.position, ref: cubeRef });
  useFrame(bobbing);

  return (
    <animated.group {...props}>
      <mesh geometry={nodes.Cube.geometry} position={CUBE_LOC.position} ref={cubeRef} rotation={CUBE_LOC.rotation}>
        <meshStandardMaterial {...materials} />
      </mesh>
    </animated.group>
  );
};

useGLTF.preload(ASSET_PATH);
