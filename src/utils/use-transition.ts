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

type CallbackParam = TransitionState | ((toState?: TransitionState) => TransitionState);

export const useTransition = () => {
  const [state, setState] = useState<TransitionState>(TransitionState.Exited);

  const next = useCallback((toState?: CallbackParam) => {
    // Without any arguments, next toggles to the next state
    if (!toState) {
      return setState((currentState) => {
        const currentStateIndex = ORDERED_STATES.findIndex((s) => s === currentState);
        const nextStateIndex = (currentStateIndex + 1) % ORDERED_STATES.length;
        return ORDERED_STATES[nextStateIndex];
      });
    }

    // If callback provided, pass in current state and resolve new state
    if (toState instanceof Function) {
      return setState((currentState) => toState(currentState));
    }

    // In this case the desired end state was provided
    return setState(toState);
  }, []);

  return {
    isEntering: state === TransitionState.Entering,
    isExiting: state === TransitionState.Exiting,
    state,
    next,
  };
};
