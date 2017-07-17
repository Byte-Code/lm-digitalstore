import { Map, List, fromJS } from 'immutable';
import * as _ from 'lodash';
import appPackage from '../package.json';
import { getPromotions, filterPromotions } from '../utils/marketingUtils';
import stores from '../../mocks/stores';

const productPropertiesMap = Map({
  prod_id: ['code'],
  prod_name: ['name'],
  prod_brand: ['brand', 'name'],
  prod_category: ['mainCategoryName'],
  prod_univers: ['mainCategoryRooms', '0'],
  prod_price: ['price', 'selling', 'gross'],
  prod_avail_online: ['vendible'],
  prod_avail_store: ['isClickCollectProduct'],
  prod_gamma: ['gamma'],
  prod_sconto: ['price', 'selling', 'discount']
});

const layerMap = Map({ filter_name: List(), filter_value: List() });

const LABEL = {
  PROD_SCONTO: 'prod_sconto',
  PROD_AVAIL_ONLINE: 'prod_avail_online',
  PROD_AVAIL_STORE: 'prod_avail_store',
  PROD_VARIANT: 'prod_variant',
  PROD_PUNTI_OMAGGIO: 'prod_puntiomaggio',
  PROD_IDEAPIU: 'prod_idepiu',
  PROD_BUNDLE: 'prod_bundle',
  FILTER_NAME: 'filter_name',
  FILTER_VALUE: 'filter_value',
  FILTER_RESULT: 'filter_result',
  PROD_POSITION: 'prod_position',
  PROD_LIST: 'prod_list',
  PROD_GAMMA: 'prod_gamma',
  PROD_NEW: 'prod_new',
  PROD_PRICE: 'prod_price'
};

const relatedProductsSize = 12;

const buildCommonLayer = (product) => {
  const commonPropertiesLayer = productPropertiesMap.reduce((acc, property, key) => {
    const productProperty = product.hasIn(property) ? product.getIn(property) : '';
    return acc.set(key, List().push(productProperty));
  }, Map({}));

  const normalizedCommonPropertiesLayer = normalizeProperties(
    commonPropertiesLayer
  );
  return normalizedCommonPropertiesLayer;
};

const normalizeProperties = (layer) =>
  layer
    .set(LABEL.PROD_SCONTO, normalizeSconto(layer.get(LABEL.PROD_SCONTO)))
    .set(LABEL.PROD_AVAIL_ONLINE, normalizeAvail(layer.get(LABEL.PROD_AVAIL_ONLINE)))
    .set(LABEL.PROD_AVAIL_STORE, normalizeAvail(layer.get(LABEL.PROD_AVAIL_STORE)))
    .set(LABEL.PROD_PRICE, normalizePrice(layer.get(LABEL.PROD_PRICE)));

const normalizeSconto = (value = Map({})) => {
  const sconto = value.get(0);
  return List().push(sconto !== '' ? Math.round(sconto * 10).toString() : sconto);
};

const normalizePrice = (value = Map({})) => {
  const price = value.get(0);
  return List().push(price !== '' ? price.toFixed(2) : '');
};

const normalizeAvail = (field = List()) =>
  List().push(field.get(0) ? '1' : '0');

const isProductNew = product => {
  const marketingAttributes = product.get('marketingAttributes');
  const loyaltyProgram = product.get('loyaltyProgram');

  if (marketingAttributes && loyaltyProgram) {
    const promotions = getPromotions(marketingAttributes, loyaltyProgram);
    const filteredPromotions = filterPromotions(promotions);
    const isNew = filteredPromotions.reduce(
      (acc, promotion) => promotion.get('code') === 'NOVITA',
      false
    );

    const prodNew = isNew ? '1' : '0';
    return Map({ prod_new: List().push(prodNew) });
  }
};

const getVariant = product => {
  const masterProductCode = product.get('masterProductCode');
  const value = masterProductCode
    ? `${product.get('code')}_${masterProductCode}`
    : 'master';

  return Map({ [LABEL.PROD_VARIANT]: List().push(value) });
};

const getGiftPoints = product => {
  const giftPoints = product.getIn(['loyaltyProgram', 'type']);
  const list = List();
  let layer = Map({});

  if (giftPoints && giftPoints === 'ADDITIONAL_POINTS') {
    const points = list.push(
      Math.round(product.getIn(['loyaltyProgram', 'value']) * 10)
    );
    layer = layer.set(LABEL.PROD_PUNTI_OMAGGIO, points);
  }
  return layer;
};

const getIdeapiuPoints = product => {
  const ideapiuPointsType = product.getIn(['loyaltyProgram', 'type']);
  const list = List();
  let layer = Map({});

  if (ideapiuPointsType && ideapiuPointsType === 'DISCOUNT') {
    const points = list.push(
      Math.round(product.getIn(['loyaltyProgram', 'value']) * 10)
    );
    layer = layer.set(LABEL.PROD_IDEAPIU, points);
  }
  return layer;
};

const getBundle = product => {
  const isBundle = product.getIn(['bundleInformation', 'isBundle']);
  const list = List();
  let layer = Map({ prod_bundle: list.push('0') });

  if (isBundle) {
    layer = layer.set(LABEL.PROD_BUNDLE, list.push('1'));
  }
  return layer;
};

const getProdList = (product, path) => {
  const mainCategory = product.get('mainCategory');
  const mainCategoryName = product.get('mainCategoryName');
  const pageContext = getPageContext(path[0]);
  return `${pageContext} > ${mainCategoryName}/${mainCategory}`;
};

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};

const buildNavigationStore = (storeCode = null) => {
  let storeName = '';

  if (storeCode) {
    stores.forEach(store => {
      if (store.storeCode === storeCode) {
        storeName = `${storeCode} - ${store.storeName}`;
      }
    });
  }

  return Map({ navigation_store: storeName });
};

const buildAppliedFilters = (filterGroup, appliedFilters) => {
  const dataLayer = filterGroup.reduce((acc, group) => {
    const groupName = group.get('group');
    let accumulator = acc;

    const activeFilters = group
      .get('filters')
      .filter(filter => appliedFilters.includes(filter.get('code')));

    if (activeFilters.size) {
      const newLayer = buildLayer(activeFilters, groupName);
      accumulator = accumulator
        .updateIn([LABEL.FILTER_NAME], arr =>
          arr.concat(newLayer.get(LABEL.FILTER_NAME))
        )
        .updateIn([LABEL.FILTER_VALUE], arr =>
          arr.concat(newLayer.get(LABEL.FILTER_VALUE))
        );
    }

    return accumulator;
  }, layerMap);

  return dataLayer;
};

const buildLayer = (activeFilters = List(), groupName = '') =>
  activeFilters.reduce(
    (acc, activeFilter) =>
      acc
        .updateIn([LABEL.FILTER_NAME], arr => arr.push(groupName))
        .updateIn([LABEL.FILTER_VALUE], arr =>
          arr.push(activeFilter.get('name'))
        ),
    layerMap
  );

const buildSellingAid = (sellingAids, currentAid) => {
  const aidGroupName = sellingAids.get('userText');
  const { name } = sellingAids
    .get('aids')
    .filter(aid => aid.get('code') === currentAid)
    .get(0)
    .toJS();

  return layerMap
    .updateIn([LABEL.FILTER_NAME], arr => arr.push(aidGroupName))
    .updateIn([LABEL.FILTER_VALUE], arr => arr.push(name));
};

const buildFiltersDataLayer = (layerDataList = []) =>
  layerDataList.reduce(
    (acc, data) =>
      acc
        .updateIn([LABEL.FILTER_NAME], arr =>
          arr.concat(data.get(LABEL.FILTER_NAME))
        )
        .updateIn([LABEL.FILTER_VALUE], arr =>
          arr.concat(data.get(LABEL.FILTER_VALUE))
        ),
    layerMap
  );

const addResultToLayer = (productsNumber = 0, dataLayer = Map({})) =>
  dataLayer.set(
    LABEL.FILTER_RESULT,
    productsNumber > 12 ? '12' : productsNumber.toString()
  );

const getPageContext = (value) => {
  const map = Map({
    catalogue: 'gallery-prodotto',
    product: 'scheda-prodotto'
  });

  return map.get(value);
};

const resetOldLevels = (list, start, end) => list.slice(start, end);

// ---------------------   EXPORTED FUNCTIONS ------------------->

const buildPageName = (type, data, pageName = List()) => {
  const {
    worldName = '',
    pathArray = [],
    categoryCode = '',
    categoryName = '',
    prodName = '',
    prodCode = ''
    } = data;

  const isSessionStarting = pageName.size === 0 && type && type === 'session';
  const isCatalogStarting = pageName.size > 1 && type && type === 'catalogue';
  const isProductStarting = pageName.size > 1 && type && type === 'product';
  let levels = pageName;

  if (isSessionStarting) {
    levels = levels.push(worldName).push('homepage');
  }

  if (isCatalogStarting) {
    levels = resetOldLevels(levels, 0, 1);
    levels = levels
      .push('prodotti')
      .push(getPageContext(pathArray[0]))
      .push(categoryName)
      .push(categoryCode);
  }

  if (isProductStarting) {
    levels = resetOldLevels(levels, 0, 5);
    levels = levels
      .push(prodName)
      .push(prodCode)
      .set(2, getPageContext(pathArray[0]));
  }

  return levels;
};

const buildProductLayer = (product = {}, action = 'detail') => {
  let productLayer = Map({});

  if (!_.isEmpty(product)) {
    const commonProperties = buildCommonLayer(product);
    const newProductProperty = isProductNew(product);
    const variantProperty = getVariant(product);
    const giftPoints = getGiftPoints(product);
    const ideapiuPoints = getIdeapiuPoints(product);
    const isBundle = getBundle(product);
    const prodAction = Map({ prod_action: action });

    productLayer = productLayer.merge(
      commonProperties,
      newProductProperty,
      variantProperty,
      giftPoints,
      ideapiuPoints,
      isBundle,
      prodAction
    );
    return productLayer;
  }
};

const buildRelatedProductsLayer = ({ products = List(), pathArray = [] }) => {
  const productList = products.size > relatedProductsSize
    ? List(products).setSize(relatedProductsSize)
    : products;

  let prodPositionCount = 0;

  if (products.size) {
    const listOfProductsLayer = productList.map(product => {
      const prodPosition = List().push((prodPositionCount += 1));
      const prodListList = List().push(getProdList(product, pathArray));

      let productLayer = buildCommonLayer(product);
      // add additional properties to productLayer
      productLayer = productLayer.set(LABEL.PROD_POSITION, prodPosition);
      productLayer = productLayer.set(LABEL.PROD_LIST, prodListList);

      return productLayer
        .set(LABEL.PROD_POSITION, prodPosition)
        .set(LABEL.PROD_LIST, prodListList)
        .delete(LABEL.PROD_GAMMA);
    });

    const mergedlistOfProductsLayer = listOfProductsLayer.reduce(
      (acc, productLayer) => {
        const mergedValues = _.mergeWith(
          acc.toJS(),
          productLayer.toJS(),
          customizer
        );
        return Map(mergedValues);
      }
    );

    const normalizeFinalLayer = mergedlistOfProductsLayer.mapKeys(key =>
      _.replace(key, 'prod', 'imp')
    );

    return normalizeFinalLayer;
  }
};

const buildActiveFilters = (filtersData = {}) => {
  const {
    sellingAids = Map({}),
    filterGroup = List(),
    productsNumber = 0,
    activeFilters = Map({}),
    } = filtersData;

  const aid = activeFilters.get('aid');
  const filters = activeFilters.get('filters');
  const availability = activeFilters.get('availability');
  let appliedFilters = layerMap;
  let aidFilters = appliedFilters;
  let availabilityFilters = appliedFilters;

  if (aid !== '') {
    aidFilters = buildSellingAid(sellingAids, aid);
  }

  if (!_.isEmpty(filters)) {
    appliedFilters = buildAppliedFilters(filterGroup, filters);
  }

  if (availability) {
    availabilityFilters = fromJS({
      filter_name: ['disponibilità in negozio'],
      filter_value: ['true']
    });
  }

  const dataLayer = buildFiltersDataLayer([
    aidFilters,
    appliedFilters,
    availabilityFilters
  ]);
  const dataLayerWithResult = addResultToLayer(productsNumber, dataLayer);
  return dataLayerWithResult;
};

const clearFilters = (dataLayer = Map({}), productsNumber = 0) =>
  dataLayer
    .set(LABEL.FILTER_VALUE, List())
    .set(LABEL.FILTER_NAME, List())
    .set(LABEL.FILTER_RESULT, productsNumber > 12 ? '12' : productsNumber.toString());


const buildReleaseVersion = (worldName = '') => `${_.snakeCase(worldName)}_${appPackage.version}`;

const normalizeProductClickLayer = (productLayer, index, product, pathArray) =>
  productLayer
    .delete(LABEL.PROD_BUNDLE)
    .delete(LABEL.PROD_GAMMA)
    .delete(LABEL.PROD_NEW)
    .delete(LABEL.PROD_VARIANT)
    .set(LABEL.PROD_POSITION, List().push(index))
    .set(LABEL.PROD_LIST, List().push(getProdList(product, pathArray)));

const getProductProperty = (product = Map({})) => {
  const jsonProduct = product.toJS();
  let prodCode = 0;
  let prodCategory = '';

  Object.keys(jsonProduct).forEach(key => {
    Object.keys(jsonProduct[key]).forEach(productProperty => {
      if (productProperty === 'code') {
        prodCode = jsonProduct[key][productProperty];
      }

      if (productProperty === 'mainCategoryName') {
        prodCategory = jsonProduct[key][productProperty];
      }
    });
  });
  return { prodCode, prodCategory };
};

export {
  buildPageName,
  buildProductLayer,
  buildRelatedProductsLayer,
  buildActiveFilters,
  clearFilters,
  buildNavigationStore,
  buildReleaseVersion,
  normalizeProductClickLayer,
  getProductProperty
};
