import { combineReducers } from 'redux-immutable';

import routing from '../reducers/Router/routerReducer';
import worldReducer from './World/worldReducer';
import weatherReducer from './Weather/weatherReducer';
import categoryReducer from './Category/categoryReducer';
import productReducer from './Product/productReducer';
import catalogueReducer from './Catalogue/catalogueReducer';
import storeCodeReducer from './storeCode/storeCodeReducer';

const rootReducer = combineReducers({
  worldReducer,
  weatherReducer,
  categoryReducer,
  productReducer,
  catalogueReducer,
  storeCodeReducer,
  routing
});

export default rootReducer;
