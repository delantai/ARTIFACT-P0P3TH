// Vendor
import { useCallback, useEffect } from 'react';
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
  const { isEntering, isExiting, state, next } = useTransition();
  const { address } = useAssetsContext();
  const prevAddress = usePrevious(address);
  const { refetch } = useAssetsQuery();

  // Transitioning state scales animation on down press
  const { scale } = useSpring({
    scale: isEntering || isExiting ? 0.75 : 1,
    config: { easing: easings.easeOutQuint, tension: 200, friction: 15, precision: 0.00001 },
  });

  // When address is changed in open state, transition to closed state
  useEffect(() => {
    if (prevAddress !== address && state === TransitionState.Entered) {
      next(TransitionState.Exiting);
    }
  }, [address, prevAddress, next, state]);

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

  // Kick off search animation when clicked
  const handleClickEntered = useCallback(() => {
    if (address) {
      refetch();
    }
    next(TransitionState.Entered);
  }, [address, next, refetch]);

  // Transition back to cube state after closing animations finish
  const handleToExited = useCallback(() => next(TransitionState.Exited), [next]);

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
