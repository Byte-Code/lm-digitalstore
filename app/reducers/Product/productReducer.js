import { Map } from 'immutable';

export default function productReducer(state = Map(), action) {
  const { type, productCode, result } = action;
  switch (type) {
    case 'SUCCESS_FETCH_PRODUCT':
      return state.set(productCode, result);
    case 'SUCCESS_FETCH_SIMILARPRODUCTS':
      return state.setIn([productCode, 'similarProducts'], result);
    default:
      return state;
  }
}
