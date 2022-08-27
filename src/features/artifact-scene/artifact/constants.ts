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

// Cube at the moment never moves from original position
const Cube: Coordinate = {
  position: [0, 1.56, 0],
  rotation: [0.68, -0.42, -0.46],
};

// Cube corners are hovering in ordered arrangement for interaction
export const ACTIVE_STATE: Coordinates = {
  Cube,
  CubeCorner001: {
    position: [3.65, 0.83, 2.1],
    rotation: [-1.64, -0.85, -2.22],
  },
  CubeCorner002: {
    position: [2.23, 3.9, 3.38],
    rotation: [2.26, 0.06, 1.9],
  },
  CubeCorner003: {
    position: [2.2, -0.17, 3],
    rotation: [1.46, -0.85, 1.97],
  },
  CubeCorner004: {
    position: [3.81, 2.7, 1.19],
    rotation: [0.07, -0.35, -0.5],
  },
  CubeCorner005: {
    position: [-2, -0.21, 3.3],
    rotation: [2.3, 0.18, -1.37],
  },
  CubeCorner006: {
    position: [-3.56, 0.88, 2.11],
    rotation: [1.2, -0.73, -0.65],
  },
  CubeCorner007: {
    position: [-2.14, 4.03, 3],
    rotation: [-0.01, 0.62, -1.95],
  },
  CubeCorner008: {
    position: [-3.76, 2.64, 1.16],
    rotation: [1.96, 0.15, -1.93],
  },
};

// Cube corners are attached to cube body in idle state
export const CLOSED_STATE: Coordinates = {
  Cube,
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

// Cube corners are flipped towards camera for viewing
export const FLIPPED_STATE: Coordinates = {
  Cube,
  CubeCorner001: {
    position: [3.65, 0.83, 1.9],
    rotation: [1.13, -0.85, -2.22],
  },
  CubeCorner002: {
    position: [2.23, 3.9, 3.28],
    rotation: [-0.77, 0.26, 1.7],
  },
  CubeCorner003: {
    position: [2, -0.17, 3.1],
    rotation: [2.79, -1.4, 0.22],
  },
  CubeCorner004: {
    position: [3.81, 2.7, 1.09],
    rotation: [-2.98, -0.35, -0.5],
  },
  CubeCorner005: {
    position: [-2, -0.21, 3.2],
    rotation: [-0.84, 0.18, -1.37],
  },
  CubeCorner006: {
    position: [-3.56, 0.78, 2.01],
    rotation: [-1.77, -0.73, -0.65],
  },
  CubeCorner007: {
    position: [-2.14, 3.73, 3.3],
    rotation: [-2.26, 0.62, -1.95],
  },
  CubeCorner008: {
    position: [-3.76, 2.54, 1.16],
    rotation: [-0.98, 0.15, -1.93],
  },
};

//
export const OPEN_STATE: Coordinates = {
  Cube,
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
