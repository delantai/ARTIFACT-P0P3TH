// Vendor
import { Canvas as FiberCanvas } from '@react-three/fiber';
import { ContactShadows, useContextBridge } from '@react-three/drei';

// Helpers
import { Artifact } from 'src/features/artifact';
import { ArtifactContext } from 'src/features/artifact/context';
import { AssetsContext } from 'src/features/open-sea/context';
import { context as QueryContext } from 'src/pages/query';

// Module
import { Camera } from './Camera';
import { Effects } from './Effects';
import { Environment } from './Environment';

/**
 * The Canvas houses our artifact scene
 *
 * TODOS:
 *   - Zoom out a little on input focus
 *   - FIX flicker on texture load
 *   - Pagination controls
 *   - Add sound effect
 *   - Add wobble on corner click
 *   - Env particle effects
 *   - Animated shader for frosted glass cube with glow
 *   - Cast shadows from artifact corners
 */
export const Canvas = () => {
  // Necessary since there are issues passing context between two renderers
  // https://docs.pmnd.rs/react-three-fiber/advanced/gotchas#consuming-context-from-a-foreign-provider
  const ContextBridge = useContextBridge(ArtifactContext, AssetsContext, QueryContext);

  return (
    <FiberCanvas gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]}>
      <ContextBridge>
        <color attach="background" args={['#12181d']} />
        <Artifact />
        <Camera />
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
        <Environment />
        <Effects />
      </ContextBridge>
    </FiberCanvas>
  );
};
