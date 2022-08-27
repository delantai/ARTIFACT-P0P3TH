// Vendor
import { useCallback, useEffect, useState } from 'react';
import { useSpring, easings } from '@react-spring/three';

// Helpers
import { useAssetsContext } from 'src/features/open-sea/context';
import { useAssetsQuery } from 'src/features/open-sea/queries';
import { useTransition, TransitionState } from 'src/utils/use-transition';

// Module
import { usePrevious } from 'src/utils/use-previous';
import { ArtifactSolid } from './ArtifactSolid';
import { ArtifactSplit } from './ArtifactSplit';
import { Controls } from './Controls';

export const Artifact = () => {
  // const [artifactState, setArtifactState] = useState<ArtifactState>(ArtifactState.Closed);
  const { isEntering, isExiting, state, next } = useTransition();
  const { address } = useAssetsContext();
  const prevAddress = usePrevious(address);
  const { data, refetch } = useAssetsQuery();

  // 1. Kick off search animation when clicked
  // 2. When data arrives, animate to proper state
  // 3. When address is removed, transition to closed state
  useEffect(() => {
    if (prevAddress && !address) {
      next(TransitionState.Exiting);
    }
  }, [address, prevAddress, next]);

  // Mouse event handlers
  const handleEntering = useCallback(() => next(TransitionState.Entering), [next]);
  const handleEntered = useCallback(
    // Cannot transition to Entered from Exited, this may happen because
    // PresentationControls sometimes misfires onPointerOut on click
    () => next((currentState) => (currentState === TransitionState.Exited ? currentState : TransitionState.Entered)),
    [next],
  );
  const handleExiting = useCallback(() => next(TransitionState.Exiting), [next]);
  const handleExited = useCallback(
    // Cannot transition to Exited from Entered, this may happen because
    // PresentationControls sometimes misfires onPointerOut on click
    () => next((currentState) => (currentState === TransitionState.Entered ? currentState : TransitionState.Exited)),
    [next],
  );

  // Click event handlers manage search state
  const handleToExited = useCallback(() => next(TransitionState.Exited), [next]);
  const handleClickEntered = useCallback(() => {
    if (address) {
      refetch();
    }
    next(TransitionState.Entered);
  }, [address, next, refetch]);

  // Transition scale animation
  const { scale } = useSpring({
    scale: isEntering || isExiting ? 0.75 : 1,
    config: { easing: easings.easeOutQuint, tension: 200, friction: 15, precision: 0.00001 },
  });

  return (
    <Controls snap>
      {[TransitionState.Exited, TransitionState.Entering].includes(state) ? (
        <ArtifactSolid
          scale={scale}
          // state={state}
          onClick={handleClickEntered}
          onPointerDown={handleEntering}
          onPointerOut={handleExited} // Back to Exited if mouse leaves (on drag)
        />
      ) : (
        <ArtifactSplit
          scale={scale}
          state={state}
          onExiting={handleToExited}
          onPointerDown={handleExiting}
          onPointerOut={handleEntered} // Back to Entered if mouse leaves (on drag)
        />
      )}
    </Controls>
  );
};
