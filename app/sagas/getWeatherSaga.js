import { call, put, takeEvery } from 'redux-saga/effects';
import { fromJS } from 'immutable';

import * as actionTypes from '../actions/actionTypes';
import * as weatherActions from '../actions/weatherActions';
import { fetchWeather } from '../../mocks/apiMock';

export function* callFetchWeather() {
  try {
    const result = fromJS(yield call(fetchWeather));
    yield put(weatherActions.successFetchWorld(result))
  } catch (error) {
    yield put(weatherActions.failureFetchWorld())
  }
}

export default function* getWeatherSaga() {
  yield takeEvery(actionTypes.REQUEST_FETCH_WEATHER, callFetchWeather);
}
