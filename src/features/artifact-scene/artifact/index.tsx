// Vendor
import { ComponentProps, useCallback } from 'react';
import { useSpring, easings } from '@react-spring/three';
import { PresentationControls } from '@react-three/drei';

// Helpers
import { useTransition, TransitionState } from 'src/utils/use-transition';

// Module
import { ArtifactSolid } from './ArtifactSolid';
import { ArtifactSplit } from './ArtifactSplit';

/**
 * Controls for making artifact spinnable on drag
 */
const Controls = ({ children, ...props }: ComponentProps<typeof PresentationControls>) => (
  <PresentationControls
    config={{ mass: 1, tension: 80, friction: 12 }}
    cursor={false}
    speed={1.5}
    global
    polar={[0, 0]}
    {...props}>
    {children}
  </PresentationControls>
);

interface Props {
  onClick?: (state: TransitionState) => void;
}

export const Artifact = ({ onClick }: Props) => {
  // const [artifactState, setArtifactState] = useState<ArtifactState>(ArtifactState.Closed);
  const { isEntering, isExiting, state, next } = useTransition();

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

  const handleClickEntered = useCallback(() => {
    console.log('handling click entered: ', state);
    onClick?.(TransitionState.Entered);
    next(TransitionState.Entered);
  }, [next, state]);

  const handleClickExited = useCallback(() => {
    console.log('handling click exited: ', state);
    onClick?.(TransitionState.Exited);
    next(TransitionState.Exited);
  }, [next, state]);

  // const handleEntering = useCallback(
  //   () =>
  //     next((currentValue) => {
  //       console.log(' > to ENTERING from: ', currentValue);
  //       return TransitionState.Entering;
  //     }),
  //   [next],
  // );
  // const handleEntered = useCallback(
  //   // Cannot transition to Entered from Exited, this may happen because
  //   // PresentationControls sometimes triggers onPointerOut from a simple click
  //   () =>
  //     next((currentState) => {
  //       console.log(' > to ENTERED from: ', currentState);
  //       return currentState === TransitionState.Exited ? currentState : TransitionState.Entered;
  //     }),
  //   [next],
  // );
  // const handleExiting = useCallback(
  //   () =>
  //     next((currentValue) => {
  //       console.log(' > to Exiting from: ', currentValue);
  //       return TransitionState.Exiting;
  //     }),
  //   [next],
  // );
  // const handleExited = useCallback(
  //   // Cannot transition to Exited from Entered, this may happen because
  //   // PresentationControls sometimes triggers onPointerOut from a simple click
  //   () =>
  //     next((currentState) => {
  //       console.log(' > to Exited from: ', currentState);
  //       return currentState === TransitionState.Entered ? currentState : TransitionState.Exited;
  //     }),
  //   [next],
  // );

  // Transition scale animation
  const { scale } = useSpring({
    scale: isEntering || isExiting ? 0.75 : 1,
    config: { easing: easings.easeOutQuint, tension: 200, friction: 15, precision: 0.00001 },
  });

  return [TransitionState.Exited, TransitionState.Entering].includes(state) ? (
    <Controls>
      <ArtifactSolid
        scale={scale}
        onClick={handleClickEntered}
        onPointerDown={handleEntering}
        onPointerOut={handleExited} // Back to Exited if mouse leaves (on drag)
      />
    </Controls>
  ) : (
    <Controls>
      <ArtifactSplit
        scale={scale}
        onClick={handleClickExited}
        onPointerDown={handleExiting}
        onPointerOut={handleEntered} // Back to Entered if mouse leaves (on drag)
      />
    </Controls>
  );
};
