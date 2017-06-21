import idleTimer from './idle-timer';
import {
  startIdleTimer,
  resetIdleTimer,
  idleTimerCompleted,
  openIdleDialog,
  closeIdleDialog
} from '../actions/idleTimerActions';

const THREE_MINUTES = 20 * 1000;
// const TWO_MINUTES = 60 * 1000 * 2.5;
const TWO_MINUTES = 10 * 1000;

export default function initializeIdleTimer(dispatch) {
  function onTimerStart() {
    dispatch(startIdleTimer());
  }

  function onTimerComplete() {
    dispatch(idleTimerCompleted());
  }

  function onReachTreshold(countDownTime) {
    dispatch(openIdleDialog(countDownTime));
  }

  function onTimerReset(tresholdReached) {
    dispatch(resetIdleTimer());
    if (tresholdReached) {
      dispatch(closeIdleDialog());
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

  return idleTimer;
}
