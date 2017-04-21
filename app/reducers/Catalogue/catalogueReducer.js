import { List } from 'immutable';

export default function catalogueReducer(state = List(), action) {
  const { result } = action;
  switch (action.type) {
    case 'SUCCESS_FETCH_PRODUCTLIST':
      return state.concat(result).toOrderedSet().toList();
    default:
      return state;
  }
}
