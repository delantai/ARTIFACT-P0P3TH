// Vendor
import { useRef } from 'react';
import * as THREE from 'three';
import type { PerspectiveCamera as PerspectiveCameraType } from 'three';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Helpers
import { useArtifactContext } from 'src/features/artifact/context';
import { useAssetsContext } from 'src/features/open-sea/context';

interface Coordinate {
  position: [number, number, number];
  rotation: THREE.Euler;
}

const STEP = 0.05; // Speed of camera movements
const DEFAULT_FOV = 25;

const CAMERA_LOC: Coordinate = {
  position: [0, 3, 20],
  rotation: new THREE.Euler(-Math.PI / 32, 0, 0),
};

const positionTarget = new THREE.Vector3();
const lookTarget = new THREE.Vector3();
const rotationTarget = new THREE.Quaternion();

export const Camera = () => {
  const cameraRef = useRef<PerspectiveCameraType>(null);
  const { focusedCorner } = useArtifactContext();
  const { isInputFocused } = useAssetsContext(); // Assets global app state

  // Dolly, narrow FOV, and look at artifact corner, or return home
  useFrame(() => {
    const camera = cameraRef?.current;
    const isCornerFocused = !!focusedCorner?.position;
    if (!camera) {
      return;
    }

    let pos: Coordinate['position'];
    if (isCornerFocused) {
      // Position camera lower for low corners
      const posY = (focusedCorner?.position?.[1] ?? 0) < 1 ? -1 : 5;
      pos = [0, posY, 12];
    } else if (isInputFocused) {
      // Dolly back slightly when searching
      pos = [CAMERA_LOC.position[0], CAMERA_LOC.position[1], 25];
    } else {
      pos = CAMERA_LOC.position;
    }

    camera.position.lerp(positionTarget.set(...pos), STEP);
    camera.fov = THREE.MathUtils.lerp(camera.fov, isCornerFocused ? 12 : DEFAULT_FOV, STEP); // change FOV

    // Point camera
    if (isCornerFocused) {
      // Smoothly focus slightly to the right of our focused corner
      camera.lookAt(
        lookTarget.set(focusedCorner.position[0] + 0.75, focusedCorner.position[1], focusedCorner.position[2]),
        STEP,
      );
    } else {
      camera.quaternion.slerp(rotationTarget.setFromEuler(CAMERA_LOC.rotation), STEP);
    }
    camera.updateProjectionMatrix();
  });

  return (
    <PerspectiveCamera
      aspect={16 / 9}
      fov={DEFAULT_FOV}
      makeDefault
      position={CAMERA_LOC.position}
      ref={cameraRef}
      rotation={CAMERA_LOC.rotation}
    />
  );
};
