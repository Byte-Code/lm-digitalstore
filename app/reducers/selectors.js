import getWorldSelector from './World/worldSelectors';
import getWeatherSelector from './Weather/weatherSelectors';
import * as categorySelectors from './Category/categorySelectors';
import * as catalogueSelectors from './Catalogue/catalogueSelectors';
import * as storeCodeSelectors from './StoreCode/storeCodeSelectors';
import * as storeSelectors from './Store/storeSelectors';
import getProductSelector from './Product/productSelectors';
import * as filtersSelector from './Filters/filtersSelectors';

export function getWorld(state) {
  return getWorldSelector(state.get('worldReducer'));
}

export function getWeather(state) {
  return getWeatherSelector(state.get('weatherReducer'));
}

export function getCategory(state, categoryCode) {
  return categorySelectors.getCategory(state.get('categoryReducer'), categoryCode);
}

export function getSellingAids(state, categoryCode) {
  return categorySelectors.getSellingAids(state.get('categoryReducer'), categoryCode);
}

export function getFilters(state, categoryCode) {
  return categorySelectors.getFilters(state.get('categoryReducer'), categoryCode);
}

export function getOrderedProducts(state, categoryCode) {
  return categorySelectors.getOrderedProducts(state.get('categoryReducer'), categoryCode);
}

export function getFilteredIDs(state, filterMap, categoryCode) {
  return categorySelectors.getFilteredIDs(state.get('categoryReducer'), filterMap, categoryCode);
}

export function getProduct(state, productCode) {
  return getProductSelector(state.get('productReducer'), productCode);
}

export function getProductsToShow(state, productIDList) {
  return catalogueSelectors.getProductsToShow(state.get('catalogueReducer'), productIDList);
}

export function getStoreCode(state) {
  return storeCodeSelectors.getStoreCode(state.get('storeCodeReducer'));
}

export function getStore(state) {
  return storeSelectors.getStoreInfo(state.get('storeReducer'));
}

export function getStoreName(state) {
  return storeSelectors.getStoreName(state.get('storeReducer'));
}

export function getNearbyStores(state) {
  return storeSelectors.getNearbyStores(state.get('storeReducer'));
}

export function getFilterMap(state) {
  return filtersSelector.getFilterMap(state.get('filtersReducer'));
}
