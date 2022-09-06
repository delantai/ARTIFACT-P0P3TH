// Vendor
import { ComponentProps, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { animated, easings, useSpring, useSpringRef } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useGesture } from '@use-gesture/react';

// Helpers
import { DreiGLTF } from 'src/@types';
import { useAssetsQuery } from 'src/features/open-sea/queries';
import { OpenSeaAsset } from 'src/features/open-sea/@types';
import { useAnimBobbing } from 'src/utils/threejs/use-anim-bobbing';
import { usePrevious } from 'src/utils/use-previous';
import { TransitionState } from 'src/utils/use-transition';

// Module
import { CUBE_LOC, materials } from './constants';
import { ArtifactCorner, CornerState } from './ArtifactCorner';

const ASSET_PATH = '/assets/threejs/artifact-split.glb';
const DRAG_LIMIT = 800;
const DRAG_SPRING_CONFIG = { easing: easings.easeOutQuint, mass: 1, tension: 200, friction: 8, precision: 0.00001 };

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
  const isRefetching = useRef<boolean>(false);
  const cubeRef = useRef<THREE.Mesh<THREE.BufferGeometry>>(null);
  const { gl } = useThree(); // Observe drag gestures on entire canvas
  const { nodes } = useGLTF(ASSET_PATH) as DreiGLTF;
  const [clamp, setClamp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const prevState = usePrevious(state);

  const { data, fetchNextPage, fetchPreviousPage, isFetching } = useAssetsQuery();
  const getCornerState = makeGetCornerState(isActive, isOpen);

  // Dragging reduces cube geometry scale until threshold is reached
  const springRef = useSpringRef();
  const { scale: dragScale } = useSpring({ scale: 1, config: DRAG_SPRING_CONFIG, ref: springRef });

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
  const bobbing = useAnimBobbing({ origin: CUBE_LOC.position, ref: cubeRef });
  useFrame(bobbing);

  // 5. Handle pagination on drag
  useGesture(
    {
      onDrag: ({ movement: [mx] }) => {
        if (!isActive) {
          return;
        }

        // Give visual indicator of drag limit to trigger pagination
        if (Math.abs(mx) < DRAG_LIMIT) {
          // Scales between 1 to 0.5 as you increase drag towards limit
          springRef.start({ scale: 1 - (Math.abs(mx) / DRAG_LIMIT) * 0.5, config: DRAG_SPRING_CONFIG });
        } else {
          // Sufficient drag reached, return to regular scale
          springRef.start({ scale: 1, config: DRAG_SPRING_CONFIG });
          if (!isFetching && !isRefetching.current) {
            // Do this just once, the first time we hit DRAG_LIMIT
            // Give time for animation to occur
            isRefetching.current = true;
            if (mx < 0) {
              setTimeout(() => fetchNextPage(), 750);
            } else {
              setTimeout(() => fetchPreviousPage(), 750);
            }
            setIsActive(false);
          }
        }
      },
      onDragEnd: () => {
        // Return to regular scale, in case we release drag before hitting limit
        springRef.start({ scale: 1, config: DRAG_SPRING_CONFIG });

        if (isRefetching.current) {
          isRefetching.current = false; // Reset
          if (data?.assets.length) {
            // In case we drag without a next/previous page
            setIsActive(true);
          }
        }
      },
    },
    { target: gl.domElement },
  );

  // NOTE: data is mapped according to GLB file geometry so that they have the correct order
  return (
    <animated.group {...props} scale={scale}>
      <animated.mesh
        ref={cubeRef}
        geometry={nodes.Cube.geometry}
        onPointerDown={onPointerDown}
        position={CUBE_LOC.position}
        rotation={CUBE_LOC.rotation}
        scale={dragScale}>
        <meshStandardMaterial {...materials} />
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
