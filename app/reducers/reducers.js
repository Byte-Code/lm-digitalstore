import { combineReducers } from 'redux-immutable';
import routing from '../reducers/Router/routerReducer';
import worldReducer from './World/worldReducer';

const rootReducer = combineReducers({
  worldReducer,
  routing
});

export default rootReducer;
