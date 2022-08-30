// Vendor
import { ComponentProps, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animated } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Helpers
import { useMatSimple } from 'src/utils/threejs/mats/use-mat-simple';
import { useAnimBobbing } from 'src/utils/threejs/use-anim-bobbing';
import { DreiGLTF } from 'src/@types';

// Module
import { CUBE_LOC } from './constants';

const ASSET_PATH = '/assets/threejs/artifact-solid.glb';

type Props = ComponentProps<typeof animated.group>;

export const ArtifactSolid = ({ ...props }: Props) => {
  const cubeRef = useRef<THREE.Mesh<THREE.BufferGeometry>>(null);
  const { nodes } = useGLTF(ASSET_PATH) as DreiGLTF;

  // WIP: copy UV's to UV2
  const simple = useMatSimple();
  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.geometry.attributes.uv2 = cubeRef.current.geometry.attributes.uv;
    }
  }, [cubeRef]);

  // Add resting animation
  const bobbing = useAnimBobbing({ origin: CUBE_LOC.position, ref: cubeRef });
  useFrame(bobbing);

  return (
    <animated.group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} position={CUBE_LOC.position} ref={cubeRef} rotation={CUBE_LOC.rotation}>
        {/* <meshStandardMaterial color="orange" /> */}
        {/* <meshStandardMaterial {...sapphire} /> */}
        <meshStandardMaterial {...(simple || {})} attach="material" />
      </mesh>
    </animated.group>
    // <animated.group {...props} dispose={null}>
    //   <mesh position={CUBE_LOC.position} ref={cubeRef} rotation={CUBE_LOC.rotation}>
    //     {/* <boxGeometry args={[2, 2, 2, 512, 512]} /> */}
    //     <sphereGeometry args={[1.5, 512, 512]} />
    //     <meshStandardMaterial {...(alien || {})} attach="material" />
    //   </mesh>
    // </animated.group>
  );
};

useGLTF.preload(ASSET_PATH);
