import { useEffect } from 'react';

export const useUvs = () => {
  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.geometry.attributes.uv2 = cubeRef.current.geometry.attributes.uv;
    }
  }, [cubeRef]);
};
