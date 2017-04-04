import { Map } from 'immutable';

export default function catalogueReducer(state = Map(), action) {
  switch (action.type) {
    case 'UPDATE_CATALOGUE': {
      const { productList, categoryCode } = action;
      return state.set(categoryCode, productList);
    }
    default:
      return state;
  }
}
