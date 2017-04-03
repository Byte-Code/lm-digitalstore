import { Map } from 'immutable';

export default function catalogueReducer(state = Map(), action) {
  switch (action.type) {
    case 'UPDATE_CATALOGUE': {
      const { idList } = action;
      return state.set('allProducts', idList);
    }
    default:
      return state;
  }
}
