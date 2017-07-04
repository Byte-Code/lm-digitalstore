import { Map, List, fromJS } from 'immutable';
import * as _ from 'lodash';
import { getPromotions, filterPromotions } from '../utils/marketingUtils';

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
  PROD_LIST: 'prod_list'
};

const relatedProductsSize = 12;

const buildCommonLayer = product => {
  const commonPropertiesLayer = productPropertiesMap.reduce(
    (acc, property, key) => {
      const productProperty = product.hasIn(property)
        ? product.getIn(property)
        : 'null';
      return acc.set(key, List().push(productProperty));
    },
    Map({})
  );

  const normalizedCommonPropertiesLayer = normalizeProperties(
    commonPropertiesLayer
  );
  return normalizedCommonPropertiesLayer;
};

const normalizeProperties = layer =>
  layer
    .set(LABEL.PROD_SCONTO, normalizeSconto(layer.get(LABEL.PROD_SCONTO)))
    .set(
      LABEL.PROD_AVAIL_ONLINE,
      normalizeAvail(layer.get(LABEL.PROD_AVAIL_ONLINE))
    )
    .set(
      LABEL.PROD_AVAIL_STORE,
      normalizeAvail(layer.get(LABEL.PROD_AVAIL_STORE))
    );

const normalizeSconto = (value = Map({})) => {
  const sconto = value.get(0);
  return List().push(sconto !== 'null' ? Math.round(sconto * 10) : sconto);
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
      Math.round(product.getIn('loyaltyProgram', 'value') * 10)
    );
    layer = layer.set(LABEL.PROD_PUNTI_OMAGGIO, points);
  }
  return layer;
};

const getIdeapiuPoints = product => {
  const ideapiuPoints = product.getIn(['loyaltyProgram', 'type']);
  const list = List();
  let layer = Map({});

  if (ideapiuPoints && ideapiuPoints === 'DISCOUNT') {
    const points = list.push(
      Math.round(product.getIn(LABEL.PROD_IDEAPIU, 'value') * 10)
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
  return `${path[0]} > ${mainCategoryName}/${mainCategory}`;
};

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
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

// ---------------------   EXPORTED FUNCTIONS ------------------->

const buildPageName = (path = []) => {
  let pageName = path;
  const splitChar = '/';

  if (!_.isEmpty(path)) {
    const trimSlash = _.trimStart(pageName, splitChar);
    pageName = _.split(trimSlash, splitChar);
  }
  return pageName;
};

const buildProductLayer = (product = {}) => {
  let productLayer = Map({});

  if (!_.isEmpty(product)) {
    const commonProperties = buildCommonLayer(product);
    const newProductProperty = isProductNew(product);
    const variantProperty = getVariant(product);
    const giftPoints = getGiftPoints(product);
    const ideapiuPoints = getIdeapiuPoints(product);
    const isBundle = getBundle(product);

    productLayer = productLayer.merge(
      commonProperties,
      newProductProperty,
      variantProperty,
      giftPoints,
      ideapiuPoints,
      isBundle
    );
    return productLayer;
  }
};

const buildRelatedProductsLayer = (products = List(), path = []) => {
  const productList = products.size > relatedProductsSize
    ? List(products).setSize(relatedProductsSize)
    : products;

  let prodPositionCount = 0;

  if (products.size) {
    const listOfProductsLayer = productList.map(product => {
      const prodPosition = List().push((prodPositionCount += 1));
      const prodListList = List().push(getProdList(product, path));

      let productLayer = buildCommonLayer(product);
      // add additional properties to productLayer
      productLayer = productLayer.set(LABEL.PROD_POSITION, prodPosition);
      productLayer = productLayer.set(LABEL.PROD_LIST, prodListList);
      return productLayer;
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

const clearFilters = (dataLayer = Map({})) =>
  dataLayer
    .set(LABEL.FILTER_VALUE, List())
    .set(LABEL.FILTER_NAME, List())
    .set(LABEL.FILTER_RESULT, '');

export {
  buildPageName,
  buildProductLayer,
  buildRelatedProductsLayer,
  buildActiveFilters,
  clearFilters,
};
