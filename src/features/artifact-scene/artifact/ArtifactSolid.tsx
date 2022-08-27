// Vendor
import { ComponentProps } from 'react';
import { animated } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';

// Helpers
import { DreiGLTF } from 'src/@types';

// Module
import { CLOSED_STATE } from './constants';

const ASSET_PATH = '/assets/threejs/artifact-solid.glb';

type Props = ComponentProps<typeof animated.group>;

export const ArtifactSolid = ({ ...props }: Props) => {
  const { nodes } = useGLTF(ASSET_PATH) as DreiGLTF;

  return (
    <animated.group {...props} dispose={null}>
      <mesh geometry={nodes.Cube.geometry} position={CLOSED_STATE.Cube.position} rotation={CLOSED_STATE.Cube.rotation}>
        <meshStandardMaterial color="orange" />
      </mesh>
    </animated.group>
  );
};

useGLTF.preload(ASSET_PATH);
