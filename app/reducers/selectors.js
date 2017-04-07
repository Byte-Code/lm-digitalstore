import getWorldSelector from './World/worldSelectors';
import getWeatherSelector from './Weather/weatherSelectors';
import * as categorySelectors from './Category/categorySelectors';
import * as catalogueSelectors from './Catalogue/catalogueSelectors';
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

export function getSellingAid(state, categoryCode, activeAid) {
  return categorySelectors.getSellingAid(state.get('categoryReducer'), categoryCode, activeAid);
}

export function getFilters(state, categoryCode) {
  return categorySelectors.getFilters(state.get('categoryReducer'), categoryCode);
}

export function getProduct(state, productCode) {
  return getProductSelector(state.get('productReducer'), productCode);
}

export function getProductsToShow(state, categoryCode) {
  return catalogueSelectors.getProductsToShow(state.get('catalogueReducer'), categoryCode);
}

export function getProductsByAids(state, categoryCode) {
  return catalogueSelectors.getProductsToShow(state.get('catalogueReducer'), categoryCode);
}

export function getProductsByFilters(state, categoryCode) {
  return catalogueSelectors.getProductsByFilters(state.get('catalogueReducer'), categoryCode);
}

export function getIdsToFetch(state, categoryCode, activeFilters) {
  return catalogueSelectors.getIdsToFetch(state.get('catalogueReducer'), categoryCode, activeFilters);
}
