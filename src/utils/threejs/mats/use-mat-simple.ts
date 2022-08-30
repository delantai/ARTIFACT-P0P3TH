// Vendor
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

// interface Material {
//   map?: THREE.Texture;
//   color?: number | string;
//   clearcoat?: number;
//   clearcoatRoughness?: number;
//   displacementMap?: THREE.Texture;
//   displacementScale?: number;
//   normalMap?: THREE.Texture;
//   normalScale?: THREE.Vector2;
//   aoMap?: THREE.Texture;
//   roughness?: number;
//   roughnessMap?: THREE.Texture;
//   metalness?: number;
//   envMap?: THREE.Texture;
// }

const TEXTURES = [
  '/assets/threejs/mats/sapphire/Sapphire_001_COLOR.jpg',
  '/assets/threejs/mats/sapphire/Sapphire_001_DISP.png',
  '/assets/threejs/mats/sapphire/Sapphire_001_NORM.jpg',
  '/assets/threejs/mats/sapphire/Sapphire_001_OCC.jpg',
  '/assets/threejs/mats/sapphire/Sapphire_001_ROUGH.jpg',
];

export const useMatSimple = () => {
  return useMemo(() => {
    const loader = new THREE.TextureLoader();
    // const getTexture = makeGetTexture(loader);
    // const textures = await Promise.all(TEXTURES.map(getTexture));

    const aoMap = loader.load(TEXTURES[3]);
    const displacementMap = loader.load(TEXTURES[1]);
    const map = loader.load(TEXTURES[0]);
    const normalMap = loader.load(TEXTURES[2]);
    const roughnessMap = loader.load(TEXTURES[4]);

    // const aoMap = new THREE.TextureLoader().load('/assets/threejs/mats/abstract/Abstract_003_OCC.jpg');
    // const normalMap = new THREE.TextureLoader().load('/assets/threejs/mats/abstract/Abstract_003_NRM.jpg');
    // const color = new THREE.TextureLoader().load('/assets/threejs/mats/lapiz/Lapis_Lazuli_002_basecolor.jpg');

    return {
      aoMap,
      // displacementMap,
      // displacementScale: 0.5,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      // color: 0x8418ca,
      map,
      metalness: 0.5,
      normalMap,
      normalScale: 0.15,
      roughnessMap,
      roughness: 0.2,
    };
  }, []);

  return materials;
};
