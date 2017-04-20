import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiMicro } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as productActions from '../actions/productActions';
import { requestFetchProductList } from '../actions/catalogueActions';

export function* callFetchXSellProducts({ productCode }) {
  try {
    const products = yield call(apiMicro.getCrossSellingProducts.bind(apiMicro), productCode);
    const idList = fromJS(products).map(p => p.get('code')).take(5);
    if (idList.isEmpty()) {
      throw new Error('Not Found Error');
    } else {
      yield put(requestFetchProductList(
        idList,
        productActions.successFetchXSellProducts,
        [productCode]
      ));
    }
  } catch (error) {
    yield put(productActions.failureFetchXSellProducts(error));
  }
}

export default function* getXSellProductsSaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_XSELLPRODUCTS,
    callFetchXSellProducts
  );
}
