interface Coordinate {
  position: [number, number, number];
  rotation: [number, number, number];
}

export interface Coordinates {
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

export const ACTIVE_STATE: Coordinates = {
  Cube: {
    position: [0, 1.56, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner001: {
    position: [3.45, 1.13, -2.9],
    rotation: [-1.78, -0.79, -2.39],
  },
  CubeCorner002: {
    position: [2.33, 3.9, -1.62],
    rotation: [2.02, 0.18, 1.82],
  },
  CubeCorner003: {
    position: [2, -0.17, -2],
    rotation: [0.83, -0.7, 2.1],
  },
  CubeCorner004: {
    position: [3.61, 2.7, -3.81],
    rotation: [0.43, -0.51, 0.08],
  },
  CubeCorner005: {
    position: [-2, -0.21, -1.7],
    rotation: [2.15, -0.41, -0.52],
  },
  CubeCorner006: {
    position: [-3.46, 0.98, -0.89],
    rotation: [0.64, -0.58, -1.27],
  },
  CubeCorner007: {
    position: [-2.24, 3.83, -2.5],
    rotation: [0.34, 0.59, -2.03],
  },
  CubeCorner008: {
    position: [-3.66, 2.74, -2.84],
    rotation: [2.08, 0.09, -2.32],
  },
};

export const CLOSED_STATE: Coordinates = {
  Cube: {
    position: [0, 1.56, 0],
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

export const OPEN_STATE: Coordinates = {
  Cube: {
    position: [0, 1.56, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner001: {
    position: [2.75, 2.53, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner002: {
    position: [0.93, 0.9, -1.62],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner003: {
    position: [0, -0.17, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner004: {
    position: [1.21, 0.7, 2.09],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner005: {
    position: [0, 3.79, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner006: {
    position: [-1.16, 2.38, 2.01],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner007: {
    position: [-2.34, 0.73, 0],
    rotation: [0.68, -0.42, -0.46],
  },
  CubeCorner008: {
    position: [-1.52, 2.64, -2.64],
    rotation: [0.68, -0.42, -0.46],
  },
};
