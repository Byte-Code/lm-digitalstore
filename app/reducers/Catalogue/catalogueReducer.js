import { OrderedSet } from 'immutable';

export default function catalogueReducer(state = OrderedSet(), action) {
  const { result } = action;
  switch (action.type) {
    case 'SUCCESS_FETCH_PRODUCTLIST':
      return result;
    case 'CLEAR_PRODUCT_LIST':
      return OrderedSet();
    default:
      return state;
  }
}
