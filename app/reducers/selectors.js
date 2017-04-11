import getWorldSelector from './World/worldSelectors';
import getWeatherSelector from './Weather/weatherSelectors';
import * as categorySelectors from './Category/categorySelectors';
import * as catalogueSelectors from './Catalogue/catalogueSelectors';
import * as storeIdSelectore from './StoreId/storeIdSelectors'
import getProductSelector from './Product/productSelectors';

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

export function getProduct(state, productCode) {
  return getProductSelector(state.get('productReducer'), productCode);
}

export function getProductsToShow(state, categoryCode, productIDList) {
  return catalogueSelectors.getProductsToShow(state.get('catalogueReducer'), categoryCode, productIDList);
}

export function getIdsToFetch(state, categoryCode, idsByFilters, idsByAids) {
  return catalogueSelectors.getIdsToFetch(state.get('catalogueReducer'), categoryCode, idsByFilters, idsByAids);
}

export function getStoreId(state) {
  return storeIdSelectore.getStoreId(state.get('storeIdReducer'));
}
