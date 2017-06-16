import idleTimer from './idle-timer';
import {
  startIdleTimer,
  resetIdleTimer,
  idleTimerCompleted,
  openIdleDialog,
  closeIdleDialog
} from '../actions/idleTimerActions';

const THREE_MINUTES = 60 * 1000 * 3;
const TWO_MINUTES = 60 * 1000 * 2.5;

export default function initializeIdleTimer(store) {
  function onTimerStart() {
    store.dispatch(startIdleTimer());
  }

  function onTimerComplete() {
    store.dispatch(idleTimerCompleted());
  }

  function onReachTreshold() {
    store.dispatch(openIdleDialog());
  }

  function onTimerReset(treshold) {
    store.dispatch(resetIdleTimer());
    if (treshold) {
      store.dispatch(closeIdleDialog());
    }
  }

  idleTimer.init(
    THREE_MINUTES,
    onTimerStart,
    onTimerComplete,
    TWO_MINUTES,
    onReachTreshold,
    onTimerReset
  );
}
