import { OrderedSet } from 'immutable';

export default function catalogueReducer(state = OrderedSet(), action) {
  const { result } = action;
  switch (action.type) {
    case 'SUCCESS_FETCH_PRODUCTLIST':
      return state.union(result);
    default:
      return state;
  }
}
