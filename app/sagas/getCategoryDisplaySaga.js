import LmApi from 'lm-sdk';
import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actionTypes from '../actions/actionTypes';
import * as categoryDisplayActions from '../actions/categoryDisplayActions';

const baseUrl = 'https://api-gw-qa.leroymerlin.it/api/v1';
const spaceId = 'web-prd';
const apiKey = 'testToken';
const storeCode = 89;
export const api = new LmApi(baseUrl, spaceId, storeCode, apiKey);

export function* callFetchCategoryDisplay(action) {
  try {
    const { categoryCode } = action;
    const result = fromJS(yield call(api.getCategoryDisplay.bind(api), categoryCode));
    yield put(categoryDisplayActions.successFetchCategoryDisplay(categoryCode, result));
  } catch (error) {
    yield put(categoryDisplayActions.failureFetchCategoryDisplay());
  }
}

export default function* getCategoryDisplaySaga() {
  yield takeEvery(
    actionTypes.REQUEST_FETCH_CATEGORY_DISPLAY,
    callFetchCategoryDisplay
  );
}
