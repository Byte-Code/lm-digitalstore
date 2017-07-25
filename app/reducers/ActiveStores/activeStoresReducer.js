import { List } from 'immutable';

export default function activeStoresReducer(state = List(), action) {
  switch (action.type) {
    case 'SUCCESS_FETCH_ALL_ACTIVE_STORES':
      return action.result;
    default:
      return state;
  }
}
