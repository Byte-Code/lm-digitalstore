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
import idleReducer from './Idle/idleReducer';
import activeStores from './ActiveStores/activeStoresReducer';
import realTimeStockReducer from './RealTimeStock/realTimeStockReducer';
import galleryReducer from './Gallery/galleryReducer';
import purchaseReducer from './Purchase/purchaseReducer';

const rootReducer = combineReducers({
  worldReducer,
  weatherReducer,
  categoryReducer,
  productReducer,
  catalogueReducer,
  storeCodeReducer,
  storeReducer,
  filtersReducer,
  idleReducer,
  routing,
  activeStores,
  realTimeStockReducer,
  galleryReducer,
  purchaseReducer
});

export default rootReducer;
