import { call, put, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { fromJS } from 'immutable';

import { apiClient } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as storeActions from '../actions/storeActions';

export function* callFetchNearbyStores({ lat, lng, radius }) {
  try {
    yield call(delay, 100);
    const nearbyStores = yield call(
      apiClient.fetchSearchCoords,
      { lat, lng },
      { radius, orderBy: 'distance' }
    );
    const result = fromJS(nearbyStores).get('content');
    if (result) {
      yield put(storeActions.successFetchNearbyStores(result));
    } else {
      throw new Error('Not Found Error');
    }
  } catch (error) {
    yield put(storeActions.failureFetchNearbyStores(error));
  }
}

export default function* getNearbyStoresSaga() {
  yield takeLatest(actionTypes.REQUEST_FETCH_NEARBYSTORES, callFetchNearbyStores);
}
