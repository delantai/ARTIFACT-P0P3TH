// Vendor
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { animated } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame, ThreeEvent } from '@react-three/fiber';

// Helpers
import { DreiGLTF } from 'src/@types';

// Module
import { CLOSED_STATE } from './constants';
import { ArtifactCorner, CornerState } from './ArtifactCorner';

const ASSET_PATH = '/assets/threejs/artifact-split.glb';

type Props = ComponentProps<typeof animated.group>;

export const ArtifactSplit = ({ scale, onClick, ...props }: Props) => {
  const ref = useRef<THREE.Group>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const state = isActive ? CornerState.Active : isOpen ? CornerState.Open : CornerState.Closed;

  // On mount animate to open state
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // Quick animation snapping corners back on press before unmounting
  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      // TEMPORARY FOR TESTING
      if (!isActive) {
        setIsActive(true);
        return;
      }

      setIsActive(false);
      setIsOpen(false);
      setTimeout(() => onClick?.(event), 150);
    },
    [isActive, onClick],
  );

  useFrame(() => {
    // if (ref.current) {
    //   ref.current.rotation.y += 0.01;
    // }
  });

  const { nodes } = useGLTF(ASSET_PATH) as DreiGLTF;

  return (
    <animated.group {...props} dispose={null} onClick={handleClick} ref={ref} scale={scale}>
      <animated.mesh
        geometry={nodes.Cube.geometry}
        position={CLOSED_STATE.Cube.position}
        rotation={CLOSED_STATE.Cube.rotation}>
        <meshStandardMaterial color="orange" />
      </animated.mesh>
      <ArtifactCorner geometry={nodes.CubeCorner001.geometry} id="CubeCorner001" state={state} />
      <ArtifactCorner geometry={nodes.CubeCorner002.geometry} id="CubeCorner002" state={state} />
      <ArtifactCorner geometry={nodes.CubeCorner003.geometry} id="CubeCorner003" state={state} />
      <ArtifactCorner geometry={nodes.CubeCorner004.geometry} id="CubeCorner004" state={state} />
      <ArtifactCorner geometry={nodes.CubeCorner005.geometry} id="CubeCorner005" state={state} />
      <ArtifactCorner geometry={nodes.CubeCorner006.geometry} id="CubeCorner006" state={state} />
      <ArtifactCorner geometry={nodes.CubeCorner007.geometry} id="CubeCorner007" state={state} />
      <ArtifactCorner geometry={nodes.CubeCorner008.geometry} id="CubeCorner008" state={state} />
    </animated.group>
  );
};

useGLTF.preload(ASSET_PATH);
