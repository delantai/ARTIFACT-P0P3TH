// Vendor
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { animated, useSpring, easings } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame, ThreeEvent } from '@react-three/fiber';

// Helpers
import { DreiGLTF } from 'src/@types';

// Module
import { CLOSED_STATE } from './constants';

const ASSET_PATH = '/assets/threejs/artifact-split.glb';
const SPRING_CONFIG = { easing: easings.easeOutQuint, tension: 200, friction: 15 };

type Props = ComponentProps<typeof animated.group>;

export const ArtifactSplit = ({ scale, onPointerUp, ...props }: Props) => {
  const ref = useRef<THREE.Group>(null);
  const [isOpen, setIsOpen] = useState(false);
  const coordinates = CLOSED_STATE;

  // On mount animate to open state
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Quick animation snapping corners back on press before unmounting
  const handlePointerUp = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      setIsOpen(false);
      setTimeout(() => onPointerUp?.(event), 100);
    },
    [onPointerUp],
  );

  useFrame(() => {
    // if (ref.current) {
    //   ref.current.rotation.y += 0.01;
    // }
  });

  const { position: position001 } = useSpring<{ position: [number, number, number] }>({
    position: isOpen ? [0, 0, 0] : CLOSED_STATE.CubeCorner001.position,
    config: SPRING_CONFIG,
  });

  const { nodes, materials } = useGLTF(ASSET_PATH) as DreiGLTF;
  return (
    <animated.group {...props} dispose={null} onPointerUp={handlePointerUp} ref={ref} scale={scale}>
      <animated.mesh
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={coordinates.Cube.position}
        rotation={coordinates.Cube.rotation}
      />
      <animated.mesh
        geometry={nodes.CubeCorner001.geometry}
        material={materials.Material}
        position={position001}
        rotation={coordinates.CubeCorner001.rotation}
      />
      <animated.mesh
        geometry={nodes.CubeCorner002.geometry}
        material={materials.Material}
        position={coordinates.CubeCorner002.position}
        rotation={coordinates.CubeCorner002.rotation}
      />
      <animated.mesh
        geometry={nodes.CubeCorner003.geometry}
        material={materials.Material}
        position={coordinates.CubeCorner003.position}
        rotation={coordinates.CubeCorner003.rotation}
      />
      <animated.mesh
        geometry={nodes.CubeCorner004.geometry}
        material={materials.Material}
        position={coordinates.CubeCorner004.position}
        rotation={coordinates.CubeCorner004.rotation}
      />
      <animated.mesh
        geometry={nodes.CubeCorner005.geometry}
        material={materials.Material}
        position={coordinates.CubeCorner005.position}
        rotation={coordinates.CubeCorner005.rotation}
      />
      <animated.mesh
        geometry={nodes.CubeCorner006.geometry}
        material={materials.Material}
        position={coordinates.CubeCorner006.position}
        rotation={coordinates.CubeCorner006.rotation}
      />
      <animated.mesh
        geometry={nodes.CubeCorner007.geometry}
        material={materials.Material}
        position={coordinates.CubeCorner007.position}
        rotation={coordinates.CubeCorner007.rotation}
      />
      <animated.mesh
        geometry={nodes.CubeCorner008.geometry}
        material={materials.Material}
        position={coordinates.CubeCorner008.position}
        rotation={coordinates.CubeCorner008.rotation}
      />
    </animated.group>
  );
};

useGLTF.preload(ASSET_PATH);
