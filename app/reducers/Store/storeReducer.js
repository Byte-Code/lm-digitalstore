import { Map } from 'immutable';

export default function storeReducer(state = Map(), action) {
  switch (action.type) {
    case 'SUCCESS_FETCH_STORE':
      return action.result;
    default:
      return state;
  }
}
