import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import worldReducer from './worldReducer';

const rootReducer = combineReducers({
  worldReducer,
  routing
});

export default rootReducer;
