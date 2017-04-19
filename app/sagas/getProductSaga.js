import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';
import { isValidResponse } from '../utils/utils';


export function* callFetchProduct({ productCode }) {
  try {
    const product = yield call(apiV1.getProductDisplay.bind(apiV1), productCode);
    if (isValidResponse(product)) {
      const result = fromJS(product).get('content');
      yield put(productActions.successFetchProduct(productCode, result));
    } else {
      throw new Error('Not Found Error');
    }
    // const idList = fromJS(
    //   yield call(apiMicro.getCrossSellingProducts.bind(apiMicro), productCode)
    // ).map(p => p.get('code'));
    // let similarProducts;
    // if (!idList.isEmpty()) {
    //   similarProducts = fromJS(
    //       yield call(apiV1.getProductListDisplay.bind(apiV1), idList.toJS())
    //     ).getIn(['content', 'itemlist']);
    // } else similarProducts = List();
    // const allStoreStock = fromJS(
    //   yield call(storeStockApi.getStoreAvailability.bind(storeStockApi), productCode)
    // );
    // const result = product.set('similarProducts', similarProducts).set('allStoreStock', allStoreStock);
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
