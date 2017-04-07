import { Map } from 'immutable';

export default function catalogueReducer(state = Map(), action) {
  switch (action.type) {
    case 'SUCCESS_FETCH_PRODUCTS': {
      const { productList, categoryCode } = action;
      return state.setIn([categoryCode, 'products'], productList);
    }
    default:
      return state;
  }
}
