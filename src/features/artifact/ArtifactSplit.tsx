// Vendor
import { ComponentProps, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { animated } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Helpers
import { DreiGLTF } from 'src/@types';
import { useAssetsQuery } from 'src/features/open-sea/queries';
import { OpenSeaAsset } from 'src/features/open-sea/@types';
import { usePrevious } from 'src/utils/use-previous';
import { TransitionState } from 'src/utils/use-transition';

// Module
import { CUBE_LOC } from './constants';
import { ArtifactCorner, CornerState } from './ArtifactCorner';

const ASSET_PATH = '/assets/threejs/artifact-split.glb';

type Props = ComponentProps<typeof animated.group> & {
  onExiting?: () => void;
  state: TransitionState;
};

const makeGetCornerState = (isActive: boolean, isOpen: boolean) => (data?: OpenSeaAsset) => {
  if (isActive && data) {
    return CornerState.Active;
  }
  if (isOpen) {
    // When data doesn't exist for this corner, it stays in open formation
    return CornerState.Open;
  }
  return CornerState.Closed;
};

export const ArtifactSplit = ({ onExiting, onPointerDown, scale, state, ...props }: Props) => {
  const cubeRef = useRef<THREE.Mesh<THREE.BufferGeometry>>(null);
  const { nodes } = useGLTF(ASSET_PATH) as DreiGLTF;
  const [clamp, setClamp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const prevState = usePrevious(state);

  const { data } = useAssetsQuery();
  const getCornerState = makeGetCornerState(isActive, isOpen);

  // 1. On mount animate to open state
  useEffect(() => {
    setIsOpen(true);
  }, []);

  // 2. Give the artifact time to animate open then to active
  useEffect(() => {
    if (data) {
      setTimeout(() => setIsActive(true), 50);
    }
  }, [data]);

  // 3. When exiting, animate closed
  useEffect(() => {
    if (prevState !== state && state === TransitionState.Exiting) {
      setClamp(true); // Remove bouncing when returning to cube form
      setIsActive(false);
      setIsOpen(false);
      setTimeout(() => onExiting?.(), 200);
    }
  }, [onExiting, prevState, state]);

  // 4. Add resting animation
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

  // NOTE: data is mapped according to GLB file geometry so that they have the correct order
  return (
    // react-spring + R3F need typings to be better defined
    // https://github.com/pmndrs/react-spring/issues/1302#issuecomment-840816845
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <animated.group {...props} dispose={null} scale={scale}>
      <animated.mesh
        ref={cubeRef}
        geometry={nodes.Cube.geometry}
        onPointerDown={onPointerDown}
        position={CUBE_LOC.position}
        rotation={CUBE_LOC.rotation}>
        <meshStandardMaterial color="orange" />
      </animated.mesh>
      <ArtifactCorner
        clamp={clamp}
        data={data?.assets[6]}
        geometry={nodes.CubeCorner001.geometry}
        id="CubeCorner001"
        panelGeometry={nodes.CubePanel001.geometry}
        state={getCornerState(data?.assets[6])}
      />
      <ArtifactCorner
        clamp={clamp}
        data={data?.assets[4]}
        geometry={nodes.CubeCorner002.geometry}
        id="CubeCorner002"
        panelGeometry={nodes.CubePanel002.geometry}
        state={getCornerState(data?.assets[4])}
      />
      <ArtifactCorner
        clamp={clamp}
        data={data?.assets[7]}
        geometry={nodes.CubeCorner003.geometry}
        id="CubeCorner003"
        panelGeometry={nodes.CubePanel003.geometry}
        state={getCornerState(data?.assets[7])}
      />
      <ArtifactCorner
        data={data?.assets[5]}
        clamp={clamp}
        geometry={nodes.CubeCorner004.geometry}
        id="CubeCorner004"
        panelGeometry={nodes.CubePanel004.geometry}
        state={getCornerState(data?.assets[5])}
      />
      <ArtifactCorner
        clamp={clamp}
        data={data?.assets[3]}
        geometry={nodes.CubeCorner005.geometry}
        id="CubeCorner005"
        panelGeometry={nodes.CubePanel005.geometry}
        state={getCornerState(data?.assets[3])}
      />
      <ArtifactCorner
        clamp={clamp}
        data={data?.assets[2]}
        geometry={nodes.CubeCorner006.geometry}
        id="CubeCorner006"
        panelGeometry={nodes.CubePanel006.geometry}
        state={getCornerState(data?.assets[2])}
      />
      <ArtifactCorner
        clamp={clamp}
        data={data?.assets[0]}
        geometry={nodes.CubeCorner007.geometry}
        id="CubeCorner007"
        panelGeometry={nodes.CubePanel007.geometry}
        state={getCornerState(data?.assets[0])}
      />
      <ArtifactCorner
        clamp={clamp}
        data={data?.assets[1]}
        geometry={nodes.CubeCorner008.geometry}
        id="CubeCorner008"
        panelGeometry={nodes.CubePanel008.geometry}
        state={getCornerState(data?.assets[1])}
      />
    </animated.group>
  );
};

useGLTF.preload(ASSET_PATH);
