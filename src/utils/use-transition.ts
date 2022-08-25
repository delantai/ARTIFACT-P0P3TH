// Vendor
import { useCallback, useState } from 'react';

export const enum TransitionState {
  Entering = 'entering',
  Entered = 'entered',
  Exiting = 'exiting',
  Exited = 'exited',
}

const ORDERED_STATES = [
  TransitionState.Entering,
  TransitionState.Entered,
  TransitionState.Exiting,
  TransitionState.Exited,
];

export const useTransition = () => {
  const [stateIndex, setStateIndex] = useState<number>(3);
  const state = ORDERED_STATES[stateIndex];

  // When in prop is changed, start transitioning
  const next = useCallback((toState?: TransitionState) => {
    if (toState) {
      const index = ORDERED_STATES.findIndex((s) => s === toState);
      return setStateIndex(index);
    }
    return setStateIndex((index) => (index + 1) % ORDERED_STATES.length);
  }, []);

  return {
    isEntering: state === TransitionState.Entering,
    isExiting: state === TransitionState.Exiting,
    state,
    next,
  };
};
