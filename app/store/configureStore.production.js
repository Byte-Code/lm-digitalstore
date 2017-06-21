import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { Map } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { createMiddleware } from 'redux-beacon';
import { TealiumAnalytics } from '../../tealiumAnalytics';
import eventsMap from '../analytics/eventsMap';

import rootReducer from '../reducers/reducers';

const router = routerMiddleware(hashHistory);

export const sagaMiddleware = createSagaMiddleware();

const reduxBeaconMiddleware = createMiddleware(eventsMap, TealiumAnalytics);

const enhancer = applyMiddleware(sagaMiddleware, router, reduxBeaconMiddleware);

export default function configureStore(initialState? = Map()) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
}
