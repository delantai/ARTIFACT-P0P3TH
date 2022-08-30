// Vendor
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { HDRCubeTextureLoader } from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
// import { HDRCubeTextureLoader } from 'three-stdlib';

// Module
import { FlakesTexture } from './flakes-texture';

export const useMatAlien = () => {
  const { gl } = useThree();
  const [cubeMap, setCubeMap] = useState<THREE.CubeTexture>();

  useEffect(() => {
    new HDRCubeTextureLoader()
      .setPath('/assets/threejs/mats/winter/')
      .load(['px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nx.hdr'], setCubeMap);
  }, []);

  // Generate material
  const material = useMemo(() => {
    const texture = new THREE.CanvasTexture(FlakesTexture.create());
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x = 10;
    texture.repeat.y = 6;

    const aoMap = new THREE.TextureLoader().load('/assets/threejs/mats/lapiz/Lapis_Lazuli_002_ambientOcclusion.jpg');

    const base = {
      aoMap,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      metalness: 0.9,
      roughness: 0.5,
      color: 0x8418ca,
      normalMap: texture,
      normalScale: new THREE.Vector2(0.15, 0.15),
    };

    return base;

    if (!cubeMap) {
      return base;
    }

    // Generate mipmapped radiance env map
    const gen = new THREE.PMREMGenerator(gl);
    const envMap = gen.fromCubemap(cubeMap);
    return { ...base, envMap: envMap.texture };
  }, [cubeMap, gl]);

  return material;
};
