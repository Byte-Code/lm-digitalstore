import { Map } from 'immutable';

export default function categoryReducer(state = Map(), action) {
  switch (action.type) {
    case 'SUCCESS_FETCH_CATEGORY': {
      const { categoryCode, result } = action;
      return state.set(categoryCode, result);
    }
    default:
      return state;
  }
}
