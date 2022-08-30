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
  '/assets/threejs/mats/rock/Rock_Cliff_003_basecolor.jpg',
  '/assets/threejs/mats/rock/Rock_Cliff_003_height.png',
  '/assets/threejs/mats/rock/Rock_Cliff_003_normal.jpg',
  '/assets/threejs/mats/rock/Rock_Cliff_003_ambientOcclusion.jpg',
  '/assets/threejs/mats/rock/Rock_Cliff_003_roughness.jpg',
];

const makeGetTexture = (loader: THREE.TextureLoader) => async (url: string) => {
  const texture = await loader.loadAsync(url);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
};

export const useMatRock = () => {
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
        displacementScale: 0.5,
        normalMap: textures[2],
        aoMap: textures[3],
        roughnessMap: textures[4],
        roughness: 0.8,
        metalness: 0.0,
        envMap: gl.getRenderTarget()?.texture,
      });
    };

    load();
  }, []);

  return materials;
};
