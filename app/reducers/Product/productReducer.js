import { Map } from 'immutable';

export default function productReducer(state = Map(), action) {
  switch (action.type) {
    case 'SUCCESS_FETCH_PRODUCT': {
      const { productCode, result } = action;
      return state.set(productCode, result);
    }
    default:
      return state;
  }
}
