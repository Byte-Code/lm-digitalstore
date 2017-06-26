import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { Map } from 'immutable';
import { logger } from 'redux-beacon/extensions/logger';
import createLogger from 'redux-logger';
import { createMiddleware } from 'redux-beacon';
import { tealiumAnalytics } from '../analytics/tealiumAnalytics';
// import eventsMap from '../analytics/eventsMap';
import rootReducer from '../reducers/reducers';
import AnalyticsService from '../analytics/AnalyticsService';
import * as actions from '../actions/actionTypes';

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

export const sagaMiddleware = createSagaMiddleware();

const reduxBeaconMiddleware = createMiddleware(eventsMap, tealiumAnalytics, { logger });

const actionCreators = {
  push
};

const customLogger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://extension.remotedev.io/docs/API/Arguments.html
    actionCreators
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, router, customLogger, reduxBeaconMiddleware)
);

export default function configureStore(initialState? = Map()) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers/reducers', () =>
      store.replaceReducer(require('../reducers/reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
