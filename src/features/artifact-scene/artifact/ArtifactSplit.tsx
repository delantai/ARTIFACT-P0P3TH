// Vendor
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { animated, easings, useSpring, useSpringRef } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';
import { useFrame, ThreeEvent } from '@react-three/fiber';

// Helpers
import { DreiGLTF } from 'src/@types';
import { useAssetsQuery } from 'src/features/open-sea/queries';
import { usePrevious } from 'src/utils/use-previous';
import { TransitionState } from 'src/utils/use-transition';

// Module
import { CLOSED_STATE } from './constants';
import { Controls } from './Controls';
import { ArtifactCorner, CornerState } from './ArtifactCorner';

const ASSET_PATH = '/assets/threejs/artifact-split.glb';
const SPRING_CONFIG = { easing: easings.easeOutQuint, tension: 200, friction: 15, precision: 0.00001 };

type Props = ComponentProps<typeof animated.group> & {
  onExiting?: () => void;
  state: TransitionState;
};

const getState = (isActive: boolean, isOpen: boolean) => {
  if (isActive) {
    return CornerState.Active;
  }
  if (isOpen) {
    return CornerState.Open;
  }
  return CornerState.Closed;
};

export const ArtifactSplit = ({ onExiting, onPointerDown, scale, state, ...props }: Props) => {
  const { nodes } = useGLTF(ASSET_PATH) as DreiGLTF;
  const ref = useRef<THREE.Group>(null);
  const springRef = useSpringRef();
  const [clamp, setClamp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const prevState = usePrevious(state);
  const prevIsActive = usePrevious(isActive);

  const { isLoading, data } = useAssetsQuery();
  const cornerState = getState(isActive, isOpen);

  console.log('isActive: ', isActive);

  // Group animation controller
  // const {} = useSpring({
  //   ref: springRef,
  //   config: { ...SPRING_CONFIG },
  // });

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

  // useFrame(() => {
  //   if (ref.current) {
  //     ref.current.rotation.y += 0.01;
  //   }
  // });

  // When search completes, animate to active
  // const prevIsLoading = usePrevious(isLoading);
  // useEffect(() => {
  //   if (prevIsLoading === true && isLoading === false) {
  //     setTimeout(() => setIsActive(true), 3000);
  //   }
  // }, [isLoading, prevIsLoading]);

  // Event handlers
  // Quick animation snapping corners back on press before unmounting
  // const handleClick = useCallback(
  //   (event: ThreeEvent<MouseEvent>) => {
  //     // TEMPORARY FOR TESTING
  //     // if (!isActive) {
  //     //   setIsActive(true);
  //     //   return;
  //     // }
  //     // Transition to exited, pause for a cleaner transition
  //     setTimeout(() => onClick?.(event), 100);
  //   },
  //   [isActive, onClick],
  // );

  return (
    // react-spring + R3F need typings to be better defined
    // https://github.com/pmndrs/react-spring/issues/1302#issuecomment-840816845
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <animated.group {...props} dispose={null} ref={ref} scale={scale}>
      <animated.mesh
        geometry={nodes.Cube.geometry}
        onPointerDown={onPointerDown}
        position={CLOSED_STATE.Cube.position}
        rotation={CLOSED_STATE.Cube.rotation}>
        <meshStandardMaterial color="orange" />
      </animated.mesh>
      <ArtifactCorner clamp={clamp} geometry={nodes.CubeCorner001.geometry} id="CubeCorner001" state={cornerState} />
      <ArtifactCorner clamp={clamp} geometry={nodes.CubeCorner002.geometry} id="CubeCorner002" state={cornerState} />
      <ArtifactCorner clamp={clamp} geometry={nodes.CubeCorner003.geometry} id="CubeCorner003" state={cornerState} />
      <ArtifactCorner clamp={clamp} geometry={nodes.CubeCorner004.geometry} id="CubeCorner004" state={cornerState} />
      <ArtifactCorner clamp={clamp} geometry={nodes.CubeCorner005.geometry} id="CubeCorner005" state={cornerState} />
      <ArtifactCorner clamp={clamp} geometry={nodes.CubeCorner006.geometry} id="CubeCorner006" state={cornerState} />
      <ArtifactCorner clamp={clamp} geometry={nodes.CubeCorner007.geometry} id="CubeCorner007" state={cornerState} />
      <ArtifactCorner clamp={clamp} geometry={nodes.CubeCorner008.geometry} id="CubeCorner008" state={cornerState} />
    </animated.group>
  );
};

useGLTF.preload(ASSET_PATH);
