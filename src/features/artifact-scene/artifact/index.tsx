// Vendor
import { useCallback } from 'react';
import { useSpring, easings } from '@react-spring/three';

// Helpers
import { useTransition, TransitionState } from 'src/utils/use-transition';

// Module
import { ArtifactSolid } from './ArtifactSolid';
import { ArtifactSplit } from './ArtifactSplit';
import { ArtifactState } from './constants';

export const Artifact = () => {
  // const [artifactState, setArtifactState] = useState<ArtifactState>(ArtifactState.Closed);
  const { isEntering, isExiting, state, next } = useTransition();

  // Mouse event handlers
  const handleEntering = useCallback(() => next(TransitionState.Entering), [next]);
  const handleEntered = useCallback(() => next(TransitionState.Entered), [next]);
  const handleExiting = useCallback(() => next(TransitionState.Exiting), [next]);
  const handleExited = useCallback(() => next(TransitionState.Exited), [next]);
  const handleReturnExited = useCallback(() => {
    if (isEntering) {
      // This should only trigger if we mouse leaves while in the in-between state
      console.log('returning to Exited...');
      next(TransitionState.Exited);
    }
  }, [isEntering]);
  const handleReturnEntered = useCallback(() => {
    if (isExiting) {
      // This should only trigger if we mouse leaves while in the in-between state
      console.log('returning to Entered...');
      next(TransitionState.Entered);
    }
  }, [isExiting]);

  const { scale } = useSpring({
    scale: isEntering || isExiting ? 0.75 : 1,
    config: { easing: easings.easeOutQuint, tension: 200, friction: 15 },
  });

  return [TransitionState.Exited, TransitionState.Entering].includes(state) ? (
    <ArtifactSolid
      scale={scale}
      // visible={false}
      onPointerDown={handleEntering}
      onPointerUp={handleEntered}
      onPointerOut={handleReturnExited} // Back to Exited if mouse leaves (on drag)
    />
  ) : (
    <ArtifactSplit
      scale={scale}
      onPointerDown={handleExiting}
      onPointerUp={handleExited}
      onPointerOut={handleReturnEntered} // Back to Entered if mouse leaves (on drag)
    />
  );
};
