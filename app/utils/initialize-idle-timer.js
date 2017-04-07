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
    TEN_MINUTES,
    onTimerStart,
    onTimerComplete,
    //onTimerReset
    //onTimerTick
  );
}
