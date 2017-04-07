import { Map } from 'immutable';

export default function catalogueReducer(state = Map(), action) {
  switch (action.type) {
    case 'SET_SELLING_AIDS': {
      const { productIDList, categoryCode } = action;
      return state.setIn([categoryCode, 'byAids'], productIDList);
    }
    case 'SET_FILTERS': {
      const { productIDList, categoryCode } = action;
      return state.setIn([categoryCode, 'byFilters'], productIDList);
    }
    case 'SUCCESS_FETCH_PRODUCTS': {
      const { productList, categoryCode } = action;
      return state.setIn([categoryCode, 'products'], productList);
    }
    default:
      return state;
  }
}
