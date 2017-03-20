import { Map } from 'immutable';

export default function weatherReducer(state = Map(), action) {
  switch (action.type) {
    case 'SUCCESS_FETCH_WEATHER':
      return action.result;
    default:
      return state;
  }
}
