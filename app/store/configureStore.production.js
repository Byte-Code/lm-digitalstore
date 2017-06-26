import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { Map } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { createMiddleware } from 'redux-beacon';
import { TealiumAnalytics } from '../analytics/tealiumAnalytics';
// import eventsMap from '../analytics/eventsMap';
import AnalyticsService from '../analytics/AnalyticsService';
import * as actions from '../actions/actionTypes';
import rootReducer from '../reducers/reducers';

const pageView = () => ({
  hitType: 'view',
  dataLayer: AnalyticsService.getDataLayer()
});

const eventsMap = {
  '@@router/LOCATION_CHANGE': AnalyticsService.setPageName,
  [actions.SET_ANALYTICS_SESSION_CODE]: AnalyticsService.setCid,
  [actions.SET_STORE_CODE]: AnalyticsService.setStoreCode,
  [actions.TRACK_ANALYTICS_SESSION_START]: pageView,
  [actions.IDLE_TIMER_COMPLETE]: AnalyticsService.deleteInDataLayer
};

const router = routerMiddleware(hashHistory);

export const sagaMiddleware = createSagaMiddleware();

const reduxBeaconMiddleware = createMiddleware(eventsMap, TealiumAnalytics);

const enhancer = applyMiddleware(sagaMiddleware, router, reduxBeaconMiddleware);

export default function configureStore(initialState? = Map()) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
}
