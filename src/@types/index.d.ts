import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

export type DreiGLTF = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};
