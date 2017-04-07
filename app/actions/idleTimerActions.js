import * as actions from './actionTypes';

export function startIdleTimer() {
  return ({ type: actions.IDLE_TIMER_START });
}

export function resetIdleTimer() {
  return ({ type: actions.IDLE_TIMER_RESET });
}

export function idleTimerCompleted() {
  return ({ type: actions.IDLE_TIMER_COMPLETE });
}
