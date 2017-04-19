import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import { apiV1 } from '../../mocks/apiMock';
import * as actionTypes from '../actions/actionTypes';
import * as storeActions from '../actions/storeActions';

export function* callFetchNearbyStores({ lat, lng }) {
  try {
    const nearbyStores = yield call(apiV1.getNearbyStores.bind(apiV1), lat, lng);
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
  yield takeEvery(
    actionTypes.REQUEST_FETCH_NEARBYSTORES,
    callFetchNearbyStores
  );
}
