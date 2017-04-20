import { Map } from 'immutable';

export default function productReducer(state = Map(), action) {
  const { type, productCode, result, groupCode } = action;
  switch (type) {
    case 'SUCCESS_FETCH_PRODUCT':
      return state.set(productCode, result);
    case 'SUCCESS_FETCH_RELATEDPRODUCTS':
      return state.setIn([productCode, 'suggestedProducts', groupCode], result.getIn(['content', 'itemlist']));
    case 'SUCCESS_FETCH_XSELLPRODUCTS':
      return state.setIn([productCode, 'suggestedProducts', 'POTREBBE SERVIRTI ANCHE'], result.getIn(['content', 'itemlist']));
    case 'SUCCESS_FETCH_STORESTOCK':
      return state.setIn([productCode, 'allStoreStock'], result);
    default:
      return state;
  }
}
