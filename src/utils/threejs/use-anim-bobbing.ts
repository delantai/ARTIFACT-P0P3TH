import { RefObject, useCallback } from 'react';
import * as THREE from 'three';

import { RootState } from '@react-three/fiber';

interface Params {
  factor?: number;
  origin?: [number, number, number];
  ref: RefObject<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>;
  step?: number;
}

export const useAnimBobbing = ({ factor = 0.2, origin, ref, step = 0.01 }: Params) =>
  useCallback(
    ({ clock }: RootState) => {
      if (ref.current) {
        const t = clock.getElapsedTime();
        const posY = THREE.MathUtils.lerp(ref.current.position.y, (origin?.[1] ?? 0) + Math.sin(t) * factor, step);

        // eslint-disable-next-line no-param-reassign
        ref.current.position.y = posY;
      }
    },
    [factor, origin, ref, step],
  );
