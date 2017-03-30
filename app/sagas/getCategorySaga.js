import LmApi from '@byte-code/lm-sdk';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actionTypes from '../actions/actionTypes';
import * as categoryActions from '../actions/categoryActions';

const baseUrl = 'https://api-gw-qa.leroymerlin.it/api/v1';
const spaceId = 'web-prd';
const apiKey = 'testToken';
const storeCode = 89;
export const api = new LmApi(baseUrl, spaceId, storeCode, apiKey);

export function* callFetchCategory(action) {
  try {
    const { categoryCode } = action;
    const categoryList = fromJS(yield call(api.getCategoryDisplay.bind(api), categoryCode));
    const idList = categoryList.getIn(['content', 'orderedProducts']).map(p => p.get('code'));
    const productList = fromJS(yield call(api.getProductListDisplay.bind(api), idList.toJS()));
    const result = categoryList
      .setIn(['content', 'itemList'], productList.getIn(['content', 'itemlist']))
      .get('content');
    yield put(categoryActions.successFetchCategory(categoryCode, result));
  } catch (error) {
    yield put(categoryActions.failureFetchCategory());
  }
}

export default function* getCategorySaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_CATEGORY,
    callFetchCategory
  );
}
