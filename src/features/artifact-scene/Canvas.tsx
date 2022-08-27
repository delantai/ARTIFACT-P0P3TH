// Vendor
import { ComponentProps } from 'react';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import { ContactShadows, PerspectiveCamera, OrbitControls, useContextBridge } from '@react-three/drei';

// Helpers
import { context as QueryContext } from 'src/pages/query';
import { AssetsContext } from 'src/features/open-sea/context';

// Module
import { Artifact } from './artifact';
import { Effects } from './Effects';
import { Environment } from './Environment';

// interface Props {
//   onClick?: ComponentProps<typeof Artifact>['onClick'];
// }

/**
 * The Canvas houses our artifact scene
 *
 * TODOS:
 *   - Camera movement following mouse
 *   - Ground plate
 *   - Env particle effects
 *   - Spinning dust particle effects
 *   - Search animation
 *   - Resting animation
 *   - Animated shader for frosted glass cube with glow
 *   - Pagination controls
 *   - Cast shadows from artifact corners
 */
export const Canvas = () => {
  // Necessary since there are issues passing context between two renderers
  // https://docs.pmnd.rs/react-three-fiber/advanced/gotchas#consuming-context-from-a-foreign-provider
  const ContextBridge = useContextBridge(AssetsContext, QueryContext);

  return (
    <FiberCanvas
      // camera={{ position: [0, 10, 15], fov: 25 }}
      gl={{ logarithmicDepthBuffer: true, antialias: false }}
      dpr={[1, 1.5]}>
      <ContextBridge>
        <color attach="background" args={['#12181d']} />
        <Artifact />
        <PerspectiveCamera
          aspect={16 / 9}
          fov={25}
          makeDefault
          position={[0, 3, 20]}
          rotation={[-Math.PI / 32, 0, 0]}
        />
        <hemisphereLight intensity={0.5} />
        <ContactShadows
          resolution={1024}
          frames={1}
          position={[0, -1.16, 0]}
          scale={15}
          blur={0.5}
          opacity={1}
          far={20}
        />
        {/* <mesh scale={4} position={[3, -1.161, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
        <ringGeometry args={[0.9, 1, 4, 1]} />
        <meshStandardMaterial color="white" roughness={0.75} />
      </mesh>
      <mesh scale={4} position={[-3, -1.161, -1]} rotation={[-Math.PI / 2, 0, Math.PI / 2.5]}>
        <ringGeometry args={[0.9, 1, 3, 1]} />
        <meshStandardMaterial color="white" roughness={0.75} />
      </mesh> */}
        <Environment />
        <Effects />
        {/* <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} /> */}
      </ContextBridge>
    </FiberCanvas>
  );
};
