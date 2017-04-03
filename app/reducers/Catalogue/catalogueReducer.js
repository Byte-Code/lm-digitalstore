import { Map } from 'immutable';

export default function catalogueReducer(state = Map(), action) {
  switch (action.type) {
    case 'INIT_CATALOGUE': {
      const { idList } = action;
      return state.set('allProducts', idList).set('toShow', idList);
    }
    case 'UPDATE_CATALOGUE': {
      const { idList } = action;
      return state.set('toShow', idList);
    }
    default:
      return state;
  }
}
