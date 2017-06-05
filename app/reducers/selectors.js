import { createSelector } from 'reselect';

import * as filterUtils from '../utils/filterUtils';
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

export function getProduct(state, productCode) {
  return getProductSelector(state.get('productReducer'), productCode);
}

export function getProductList(state) {
  return catalogueSelectors.getProductList(state.get('catalogueReducer'));
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

export function getActiveAid(state) {
  return filtersSelector.getActiveAid(state.get('filtersReducer'));
}

export function getActiveFilters(state) {
  return filtersSelector.getActiveFilters(state.get('filtersReducer'));
}

export function getActiveAvailability(state) {
  return filtersSelector.getActiveAvailability(state.get('filtersReducer'));
}

export const getIdsByAids = createSelector(
  [getSellingAids, getActiveAid],
  (sellingAids, activeAid) => filterUtils.filterProductsByAid(sellingAids, activeAid)
);

export const getIdsByFilters = createSelector(
  [getFilters, getActiveFilters],
  (filterGroups, activeFilters) => filterUtils.filterProducts(filterGroups, activeFilters)
);

export const getIdsByAvailability = createSelector(
  [getOrderedProducts, getActiveAvailability],
  (orderedProducts, activeAvailability) =>
    filterUtils.filterProductsByAvailability(orderedProducts, activeAvailability)
);

export const getIdsToShow = createSelector(
  [getIdsByAids, getIdsByFilters, getIdsByAvailability],
  (idsByAids, idsByFilters, idsByAvailability) =>
    filterUtils.filterCatalogue(idsByAids, idsByFilters, idsByAvailability)
);

export const getCatalogueProducts = () =>
  createSelector([getProductList, getIdsToShow], (productList, idsToShow) =>
    productList.filter(p => idsToShow.contains(p.get('code'))).toList()
  );
