import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

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
    const similarProducts = fromJS(
      yield call(apiV1.getProductListDisplay.bind(apiV1), idList.toJS())
    ).getIn(['content', 'itemlist']);
    const nearbyStoreStock = fromJS(
      yield call(apiMicro.getStoreAvailability.bind(apiMicro), productCode)
    );
    const result = product.set('similarProducts', similarProducts).set('nearbyStoreStock', nearbyStoreStock);
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
