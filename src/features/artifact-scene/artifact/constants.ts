export const enum ArtifactState {
  Closed = 'closed',
  Open = 'open',
}

interface Coordinate {
  position: [number, number, number];
  rotation: [number, number, number];
}

interface Coordinates {
  Cube: Coordinate;
  CubeCorner001: Coordinate;
  CubeCorner002: Coordinate;
  CubeCorner003: Coordinate;
  CubeCorner004: Coordinate;
  CubeCorner005: Coordinate;
  CubeCorner006: Coordinate;
  CubeCorner007: Coordinate;
  CubeCorner008: Coordinate;
}

export const CLOSED_STATE: Coordinates = {
  Cube: {
    position: [-0.15, 1.55, 0.13],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner001: {
    position: [1.16, 1.97, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner002: {
    position: [0.58, 1.15, -1.01],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner003: {
    position: [0, 0.33, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner004: {
    position: [0.58, 1.15, 1.01],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner005: {
    position: [0, 2.79, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner006: {
    position: [-0.58, 1.97, 1.01],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner007: {
    position: [-1.16, 1.15, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner008: {
    position: [-0.58, 1.97, -1.01],
    rotation: [0.68, -0.42, -0.46],
  },
};
