import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { Map } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/reducers';

const router = routerMiddleware(hashHistory);

export const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware, router);

export default function configureStore(initialState? = Map()) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
}
