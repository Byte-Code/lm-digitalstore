import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { Map } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/reducers';

const router = routerMiddleware(hashHistory);

const enhancer = applyMiddleware(thunk, router);

export default function configureStore(initialState? = Map()) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
}
