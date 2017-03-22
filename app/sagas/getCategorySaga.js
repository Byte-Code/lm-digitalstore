import LmApi from 'lm-sdk';
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
    const result = fromJS(yield call(api.getCategoryDisplay.bind(api), categoryCode));
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
