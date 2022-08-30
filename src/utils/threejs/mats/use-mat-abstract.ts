// Vendor
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

interface Material {
  map: THREE.Texture;
  displacementMap: THREE.Texture;
  displacementScale: number;
  normalMap: THREE.Texture;
  aoMap: THREE.Texture;
  roughness: number;
  roughnessMap: THREE.Texture;
  metalness: number;
  envMap?: THREE.Texture;
}

const TEXTURES = [
  '/assets/threejs/mats/abstract/Abstract_003_COLOR.jpg',
  '/assets/threejs/mats/abstract/Abstract_003_DISP.png',
  '/assets/threejs/mats/abstract/Abstract_003_NRM.jpg',
  '/assets/threejs/mats/abstract/Abstract_003_OCC.jpg',
  '/assets/threejs/mats/abstract/Abstract_003_SPEC.jpg',
];

const makeGetTexture = (loader: THREE.TextureLoader) => async (url: string) => {
  const texture = await loader.loadAsync(url);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  return texture;
};

export const useMatAbstract = () => {
  const { gl } = useThree();
  const [materials, setMaterials] = useState<Material>();

  useEffect(() => {
    const load = async () => {
      const loader = new THREE.TextureLoader();
      const getTexture = makeGetTexture(loader);
      const textures = await Promise.all(TEXTURES.map(getTexture));

      setMaterials({
        map: textures[0],
        displacementMap: textures[1],
        displacementScale: 0.05,
        normalMap: textures[2],
        aoMap: textures[3],
        roughnessMap: textures[4],
        roughness: 0.5,
        metalness: 0,
        envMap: gl.getRenderTarget()?.texture,
      });
    };

    load();
  }, []);

  return materials;
};
