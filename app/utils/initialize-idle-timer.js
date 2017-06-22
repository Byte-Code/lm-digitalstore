import idleTimer from './idle-timer';
import {
  startIdleTimer,
  resetIdleTimer,
  idleTimerCompleted,
  openIdleDialog,
  closeIdleDialog
} from '../actions/idleTimerActions';

const TEN_SECONDS = 1000 * 10;
// const TWO_MINUTES = 60 * 1000 * 2.5;
const THREE_MINUTES = 60 * 1000 * 3;

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
    TEN_SECONDS,
    onTimerStart,
    onTimerComplete,
    THREE_MINUTES,
    onReachTreshold,
    onTimerReset
  );

  return idleTimer;
}
