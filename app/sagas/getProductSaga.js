import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS, List } from 'immutable';

import { apiV1, apiMicro } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';


export function* callFetchProduct(action) {
  try {
    const { productCode } = action;
    const product = fromJS(
      yield call(apiV1.getProductDisplay.bind(apiV1), productCode)
    ).get('content');
    const idList = fromJS(
      yield call(apiMicro.getCrossSellingProducts.bind(apiMicro), productCode)
    ).map(p => p.get('code'));
    let similarProducts;
    if (!idList.isEmpty()) {
      similarProducts = fromJS(
          yield call(apiV1.getProductListDisplay.bind(apiV1), idList.toJS())
        ).getIn(['content', 'itemlist']);
    } else similarProducts = List();
    const allStoreStock = fromJS(
      yield call(apiMicro.getStoreAvailability.bind(apiMicro), productCode)
    );
    const result = product.set('similarProducts', similarProducts).set('allStoreStock', allStoreStock);
    yield put(productActions.successFetchProduct(productCode, result));
  } catch (error) {
    yield put(productActions.failureFetchProduct(error));
  }
}

export default function* getProductSaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_PRODUCT,
    callFetchProduct
  );
}
