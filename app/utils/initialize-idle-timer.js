import idleTimer from './idle-timer';
import { startIdleTimer, resetIdleTimer, idleTimerCompleted } from '../actions/idleTimerActions';

const TEN_MINUTES = 60 * 1000 * 10;

export default function initializeIdleTimer(store) {
  function onTimerStart() {
    store.dispatch(startIdleTimer());
  }

  function onTimerComplete() {
    store.dispatch(idleTimerCompleted());
  }

  function onTimerReset() {
    store.dispatch(resetIdleTimer());
  }

  idleTimer.init(
    5000,
    onTimerStart,
    onTimerComplete,
    //onTimerReset
    //onTimerTick
  );
}
