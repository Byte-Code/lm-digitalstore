import { combineReducers } from 'redux-immutable';

import routing from '../reducers/Router/routerReducer';
import worldReducer from './World/worldReducer';
import weatherReducer from './Weather/weatherReducer';
import categoryReducer from './Category/categoryReducer';
import productReducer from './Product/productReducer';
import catalogueReducer from './Catalogue/catalogueReducer';
import storeCodeReducer from './StoreCode/storeCodeReducer';
import storeReducer from './Store/storeReducer';
import filtersReducer from './Filters/filtersReducer';

const rootReducer = combineReducers({
  worldReducer,
  weatherReducer,
  categoryReducer,
  productReducer,
  catalogueReducer,
  storeCodeReducer,
  storeReducer,
  filtersReducer,
  routing
});

export default rootReducer;
