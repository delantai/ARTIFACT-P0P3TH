// Vendor
import { throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { BufferGeometry } from 'three';
import { animated, useSpring, useSpringRef, easings } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';

// Helpers
import { OpenSeaAsset } from 'src/features/open-sea/@types';
import { assertUnreachable } from 'src/utils/assertions';

// Module
import { ACTIVE_LOC, CLOSED_LOC, Coordinates, FLIPPED_LOC, materials, OPEN_LOC, PANEL_LOC } from './constants';
import { useArtifactContext } from './context';

const SPRING_CONFIG = { easing: easings.easeOutQuint, tension: 200, friction: 15, precision: 0.00001 };
const IDLE_SPRING_CONFIG = { mass: 1, tension: 10, friction: 80, precision: 0.00001 };

export const enum CornerState {
  Active = 'active',
  Closed = 'closed',
  Open = 'open',
}

interface Props {
  // Allows parent to control spring clamp behavior
  clamp?: boolean;
  // Fetched asset data to display
  data?: OpenSeaAsset;
  // Geometry loaded from glb file
  geometry: BufferGeometry;
  // Coordinate id like CubeCorner001
  id: keyof Coordinates;
  // Panel geometry loaded from glb file
  panelGeometry?: BufferGeometry;
  // Position state of corner
  state: CornerState;
}

const getCoordinates = (state: CornerState, isFlipped: boolean): Coordinates => {
  switch (state) {
    case CornerState.Active:
      return isFlipped ? FLIPPED_LOC : ACTIVE_LOC;
    case CornerState.Closed:
      return CLOSED_LOC;
    case CornerState.Open:
      return OPEN_LOC;
    default:
      return assertUnreachable(state);
  }
};

/**
 * Naive solution for randomly picking a point within a sphere of given radius
 * https://en.wikipedia.org/wiki/N-sphere#Generating_random_points
 */
const getPointInSphere = (radius = 1) => {
  // Center around origin -0.5 to 0.5
  const x = Math.random() - 0.5;
  const y = Math.random() - 0.5;
  const z = Math.random() - 0.5;
  const mag = Math.sqrt(x * x + y * y + z * z);

  // Counter-act clumping towards center, scale by desired radius.
  const d = Math.cbrt(Math.random()) * radius;

  // Multiply new radius by normalized random vector
  return [(x / mag) * d, (y / mag) * d, (z / mag) * d];
};

export const ArtifactCorner = ({ clamp = false, data, geometry, id, panelGeometry, state }: Props) => {
  const [texture, setTexture] = useState<THREE.Texture>();
  const { focusedCorner, setFocusedCorner } = useArtifactContext();
  const isFocused = focusedCorner?.id === id;
  const coordinates = getCoordinates(state, isFocused);
  const ref = useRef<THREE.Group>(null);
  const springRef = useSpringRef();
  const seed = useRef(Math.random()).current;

  useEffect(() => {
    // Load in img textures, do not use useTexture in the component scope with dynamic URL's
    new THREE.TextureLoader().load(data?.imageUrl || '/assets/images/placeholder.jpg', (map) => {
      // Threejs horizontally flips textures manually loaded into a glb geometry
      map.center.set(0.5, 0.5);
      map.repeat.set(-1, 1);
      setTexture(map);
    });
  }, [data]);

  // Throttled useFrame callback which drives idle animation for corners
  const getIdlePosition = useMemo(
    () =>
      throttle(() => {
        if (state !== CornerState.Closed && !isFocused) {
          springRef.start({ config: IDLE_SPRING_CONFIG, position: getPointInSphere(0.5) });
        }
      }, seed * 2000 + 2000), // Throttle between 2 - 4 seconds
    [isFocused, seed, springRef, state],
  );

  // Spring that manages corner position / rotation into different states
  const { position, rotation } = useSpring({
    position: coordinates[id]?.position,
    rotation: coordinates[id]?.rotation,
    config: { ...SPRING_CONFIG, clamp },
  });

  // Spring that manages idling animation for more liveliness
  const { position: grpPosition, rotation: grpRotation } = useSpring({
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    ref: springRef,
  });

  // Idle animation repositions every 2-4 seconds
  useFrame(getIdlePosition);

  // Clicking a corner should wobble it or flip it, depending on state
  const handleClick = useCallback(() => {
    if (state === CornerState.Active && data) {
      // Toggle flipped by setting id and position (used for camera controls)
      setFocusedCorner((currentCorner) =>
        currentCorner?.id === id ? null : { id, position: FLIPPED_LOC[id].position, tokenId: data.tokenId },
      );
    } else if (state === CornerState.Open) {
      // TODO: Add wobble
      // springRef.start({});
    }
  }, [data, id, setFocusedCorner, state]);

  return (
    // react-spring + R3F need typings to be better defined
    // https://github.com/pmndrs/react-spring/issues/1302#issuecomment-840816845
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <animated.group ref={ref} position={grpPosition as any} rotation={grpRotation as any}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <animated.group position={position} rotation={rotation as any}>
        <animated.mesh geometry={geometry} onClick={handleClick}>
          <meshStandardMaterial {...materials} />
          {panelGeometry && isFocused ? (
            <animated.mesh geometry={panelGeometry} onClick={handleClick} position={PANEL_LOC[id]?.position}>
              <meshBasicMaterial attach="material" map={texture} reflectivity={0} />
            </animated.mesh>
          ) : null}
        </animated.mesh>
      </animated.group>
    </animated.group>
  );
};
