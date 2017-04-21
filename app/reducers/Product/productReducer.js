import { fromJS, Map } from 'immutable';

export default function productReducer(state = Map(), action) {
  const { type, productCode, result } = action;
  switch (type) {
    case 'SUCCESS_FETCH_PRODUCT':
      return state.set(productCode, result);
    case 'SUCCESS_FETCH_RELATEDPRODUCTS':
      return state.setIn([productCode, 'similarProducts'], result);
    case 'SUCCESS_FETCH_XSELLPRODUCTS':
      return state.setIn([productCode, 'similarProducts'], fromJS([{ name: 'POTREBBE SERVIRTI ANCHE', products: result }]));
    case 'SUCCESS_FETCH_STORESTOCK':
      return state.setIn([productCode, 'allStoreStock'], result);
    default:
      return state;
  }
}
