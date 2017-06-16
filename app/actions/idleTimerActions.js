import * as actions from './actionTypes';

export function startIdleTimer() {
  return { type: actions.IDLE_TIMER_START };
}

export function resetIdleTimer() {
  return { type: actions.IDLE_TIMER_RESET };
}

export function idleTimerCompleted() {
  return { type: actions.IDLE_TIMER_COMPLETE };
}

export function openIdleDialog() {
  return { type: actions.OPEN_IDLE_DIALOG };
}

export function closeIdleDialog() {
  return { type: actions.CLOSE_IDLE_DIALOG };
}
