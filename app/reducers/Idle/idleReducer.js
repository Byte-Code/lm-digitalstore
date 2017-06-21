import { fromJS } from 'immutable';

const initialState = fromJS({
  dialogOpen: false,
  countDownTime: 0
});

function reducerName(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_IDLE_DIALOG':
      return state.set('dialogOpen', true).set('countDownTime', action.countDownTime);
    case 'CLOSE_IDLE_DIALOG':
      return state.set('dialogOpen', false);
    default:
      return state;
  }
}

export default reducerName;
