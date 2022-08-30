import { Environment as DreiEnvironment, Lightformer } from '@react-three/drei';

const INTENSITY = 2;

/**
 * Builds a cube-mapped environment declaratively.
 * Anything you put in here will be filmed (once) by a cubemap-camera
 * and applied to the scenes environment, and optionally background.
 */
export const Environment = () => (
  <DreiEnvironment resolution={512}>
    {/* Ceiling */}
    <Lightformer intensity={INTENSITY} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
    <Lightformer intensity={INTENSITY} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
    <Lightformer intensity={INTENSITY} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
    <Lightformer intensity={INTENSITY} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
    <Lightformer intensity={INTENSITY} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
    <Lightformer intensity={INTENSITY} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
    <Lightformer intensity={INTENSITY} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
    {/* Sides */}
    <Lightformer intensity={INTENSITY} rotation-y={Math.PI / 2} position={[-50, 2, 0]} scale={[100, 2, 1]} />
    <Lightformer intensity={INTENSITY} rotation-y={-Math.PI / 2} position={[50, 2, 0]} scale={[100, 2, 1]} />
    {/* Key */}
    <Lightformer
      form="ring"
      color="red"
      intensity={10}
      scale={2}
      position={[10, 5, 10]}
      onUpdate={(self) => self.lookAt(0, 0, 0)}
    />
  </DreiEnvironment>
);
