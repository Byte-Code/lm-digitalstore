import { Map } from 'immutable';

export default function catalogueReducer(state = Map(), action) {
  const { result, categoryCode } = action;
  switch (action.type) {
    case 'SUCCESS_FETCH_CATEGORY_PRODUCTS':
      return state.setIn(
        [categoryCode, 'products'], result.getIn(['content', 'itemlist'])
      );
    default:
      return state;
  }
}
