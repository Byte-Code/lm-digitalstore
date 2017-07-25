import { createSelector } from 'reselect';
import { List } from 'immutable';

import * as filterUtils from '../utils/filterUtils';
import getWorldSelector from './World/worldSelectors';
import getWeatherSelector from './Weather/weatherSelectors';
import getIdleDialogStatus from './Idle/idleSelectors';
import * as categorySelectors from './Category/categorySelectors';
import * as catalogueSelectors from './Catalogue/catalogueSelectors';
import * as storeCodeSelectors from './StoreCode/storeCodeSelectors';
import * as storeSelectors from './Store/storeSelectors';
import * as productSelectors from './Product/productSelectors';
import * as filtersSelector from './Filters/filtersSelectors';
import * as routeSelector from './Router/routerSelectors';

export function getWorld(state) {
  return getWorldSelector(state.get('worldReducer'));
}

export const getWorldName = createSelector(
  [getWorld],
  (world) => world.get('worldName')
);

export function getWeather(state) {
  return getWeatherSelector(state.get('weatherReducer'));
}

export function getStoreCode(state) {
  return storeCodeSelectors.getStoreCode(state.get('storeCodeReducer'));
}

// CATEGORY
export function getCategory(state, categoryCode) {
  return categorySelectors.getCategory(state.get('categoryReducer'), categoryCode);
}

export function getCategoryName(state, categoryCode) {
  return getCategory(state, categoryCode).get('name');
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

// CATALOGUE
export function getProductList(state) {
  return catalogueSelectors.getProductList(state.get('catalogueReducer'));
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

export const getIdsByTempFilters = createSelector(
  [getFilters, getTempFilters],
  (filterGroups, tempFilters) => filterUtils.filterProducts(filterGroups, tempFilters)
);

export const getIdsByTempAvailability = createSelector(
  [getOrderedProducts, getTempAvailability],
  (orderedProducts, tempAvailability) =>
    filterUtils.filterProductsByAvailability(orderedProducts, tempAvailability)
);

export const getCatalogueProductsIds = createSelector(
  [getIdsByAids, getIdsByFilters, getIdsByAvailability],
  (idsByAids, idsByFilters, idsByAvailability) =>
    filterUtils.filterCatalogue(idsByAids, idsByFilters, idsByAvailability)
);

export const getCatalogueProducts = () => createSelector(
  [getProductList, getCatalogueProductsIds],
  (productList, idsToShow) =>
    productList.filter(p => idsToShow.contains(p.get('code'))).toList()
  );

export const getSimilarProducts = () =>
  createSelector([getProductList, getSimilarProductsIds], (productList, idsToShow) =>
    productList.filter(p => idsToShow.contains(p.get('code'))).toList()
  );

export const getItemCount = createSelector(
  [getIdsByAids, getIdsByTempFilters, getIdsByTempAvailability],
  (idsByAids, idsByTempFilters, idsByTempAvailability) =>
    filterUtils.filterCatalogue(idsByAids, idsByTempFilters, idsByTempAvailability).size
);

export const getFilteredProductsNumber = createSelector(
  [state => state, getFiltersCategoryCode],
  (state, categoryCode) => getItemCount(state, categoryCode)
);

// FILTERS

export function getFilterMap(state) {
  return filtersSelector.getFilterMap(state.get('filtersReducer'));
}

export function getDialogStatus(state) {
  return filtersSelector.getDialogStatus(state.get('filtersReducer'));
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

export function getTempAid(state) {
  return filtersSelector.getTempAid(state.get('filtersReducer'));
}

export function getTempFilters(state) {
  return filtersSelector.getTempFilters(state.get('filtersReducer'));
}

export function getTempAvailability(state) {
  return filtersSelector.getTempAvailability(state.get('filtersReducer'));
}

export function getFiltersCategoryCode(state) {
  return filtersSelector.getCategoryCode(state.get('filtersReducer'));
}

export const getFilterInfoFromCategory = createSelector(
  [state => state, getFiltersCategoryCode],
  (state, categoryCode) => {
    const categoryInfo = getCategory(state, categoryCode);
    const sellingAids = categoryInfo.getIn(['sellingAidsProducts', 0]);
    const filterGroup = categoryInfo
                          .get('facetFilters')
                          .filterNot(group => group.get('group') === 'Prezzo');
    return { sellingAids, filterGroup };
  }
);

// PRODUCT
export function getProduct(state, productCode) {
  return productSelectors.getProduct(state.get('productReducer'), productCode);
}

export const getSimilarProductsIds = createSelector(getProduct, product => {
  if (product) {
    const sim = product.get('similarProducts') || List();
    return sim.reduce((acc, value) => acc.push(value.get('products')), List()).flatten();
  }
  return List();
});

export function getAllStoreStock(state, props) {
  return productSelectors.getAllStoreStock(state.get('productReducer'), props);
}

export function getProductReducer(state) {
  return productSelectors.getProductReducer(state);
}

// STORE
export function getStore(state) {
  return storeSelectors.getStoreInfo(state.get('storeReducer'));
}

export function getStoreName(state) {
  return storeSelectors.getStoreName(state.get('storeReducer'));
}

export function getNearbyStores(state, props) {
  return storeSelectors.getNearbyStores(state.get('storeReducer'), props);
}

export function hasNearbyStores(state) {
  return storeSelectors.hasNearbyStores(state.get('storeReducer'));
}

export const getNearbyStoresWithStock = createSelector(
  [getNearbyStores, getAllStoreStock],
  (nearbyStores, allStoreStock) =>
    nearbyStores.map(s => {
      const currentStore = allStoreStock.find(ns => ns.get('storeCode') === s.get('code'));
      return s
        .set('storeStock', currentStore ? currentStore.get('storeStock') : 0)
        .set('stockStatus', currentStore ? currentStore.get('stockStatus') : 0);
    })
);

export const getNearbyStoresWithProductInStock = createSelector(
  [getNearbyStoresWithStock, getStore],
  (nearbyStoreStock, currentStore) =>
    nearbyStoreStock.filterNot(
      s => s.get('storeStock') <= 0 || s.get('code') === currentStore.get('code')
    )
);

export const getSelectedNearbyStoreInfo = selectedStore =>
  createSelector([getNearbyStoresWithStock], nearbyStoreStock =>
    nearbyStoreStock.find(ns => ns.get('code') === selectedStore)
  );

// Idle

export function getIdleDialog(state) {
  return getIdleDialogStatus(state.get('idleReducer'));
}

// Routing

export function getCurrentPath(state) {
  return routeSelector.getCurrentPath(state);
}

export function getRoutingData(state) {
  return routeSelector.getRoutingData(state);
}
