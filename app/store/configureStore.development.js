import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { Map } from 'immutable';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/reducers';

export const sagaMiddleware = createSagaMiddleware();

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
  applyMiddleware(sagaMiddleware, router, customLogger)
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
