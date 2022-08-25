// Vendor
import { ComponentProps } from 'react';
import { animated } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';

// Helpers
import { DreiGLTF } from 'src/@types';

const ASSET_PATH = '/assets/threejs/artifact-solid.glb';

type Props = ComponentProps<typeof animated.group>;

export const ArtifactSolid = ({ ...props }: Props) => {
  const { nodes, materials } = useGLTF(ASSET_PATH) as DreiGLTF;

  return (
    <animated.group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[0, 1.56, 0]}
        rotation={[0.68, -0.42, -0.46]}
      />
    </animated.group>
  );
};

useGLTF.preload(ASSET_PATH);
