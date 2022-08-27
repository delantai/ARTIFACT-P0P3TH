// Vendor
import { BufferGeometry } from 'three';
import { animated, useSpring, easings } from '@react-spring/three';

// Helpers
import { assertUnreachable } from 'src/utils/assertions';

// Module
import { ACTIVE_STATE, CLOSED_STATE, Coordinates, FLIPPED_STATE, OPEN_STATE } from './constants';

const SPRING_CONFIG = { easing: easings.easeOutQuint, tension: 200, friction: 15, precision: 0.00001 };

export const enum CornerState {
  Active = 'active',
  Closed = 'closed',
  Flipped = 'flipped',
  Open = 'open',
}

interface Props {
  // Allows parent to control spring clamp behavior
  clamp?: boolean;
  // Geometry loaded from glb file
  geometry: BufferGeometry;
  // Coordinate id like CubeCorner001
  id: keyof Coordinates;
  // Position state of corner
  state: CornerState;
}

const getCoordinates = (state: CornerState): Coordinates => {
  switch (state) {
    case CornerState.Active:
      return ACTIVE_STATE;
    case CornerState.Closed:
      return CLOSED_STATE;
    case CornerState.Open:
      return OPEN_STATE;
    case CornerState.Flipped:
      return FLIPPED_STATE;
    default:
      return assertUnreachable(state);
  }
};

export const ArtifactCorner = ({ clamp = false, geometry, id, state }: Props) => {
  const coordinates = getCoordinates(state);

  const { position, rotation } = useSpring({
    position: coordinates[id].position,
    rotation: coordinates[id].rotation,
    config: { ...SPRING_CONFIG, clamp },
  });

  return (
    // react-spring + R3F need typings to be better defined
    // https://github.com/pmndrs/react-spring/issues/1302#issuecomment-840816845
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <animated.mesh geometry={geometry} position={position} rotation={rotation as any}>
      <meshStandardMaterial color="orange" />
    </animated.mesh>
  );
};
