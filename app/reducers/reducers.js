import { combineReducers } from 'redux-immutable';

import routing from '../reducers/Router/routerReducer';
import worldReducer from './World/worldReducer';
import weatherReducer from './Weather/weatherReducer';

const rootReducer = combineReducers({
  worldReducer,
  weatherReducer,
  routing
});

export default rootReducer;
