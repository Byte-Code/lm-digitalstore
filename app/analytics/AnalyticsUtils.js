import { Map, List } from 'immutable';
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

const buildCommonLayer = (product) => {
  const commonPropertiesLayer = productPropertiesMap.reduce((acc, property, key) => {
    const productProperty = product.hasIn(property) ? product.getIn(property) : 'null';
    return acc.set(key, List().push(productProperty));
  }, Map({}));

  return commonPropertiesLayer;
};

const isProductNew = (product) => {
  const marketingAttributes = product.get('marketingAttributes');
  const loyaltyProgram = product.get('loyaltyProgram');

  if (marketingAttributes && loyaltyProgram) {
    const promotions = getPromotions(marketingAttributes, loyaltyProgram);
    const filteredPromotions = filterPromotions(promotions);
    const isNew = filteredPromotions
                  .reduce((acc, promotion) => promotion.get('code') === 'NOVITA', false);

    const prodNew = isNew ? '1' : '0';
    return Map({ prod_new: List().push(prodNew) });
  }
};

const getVariant = (product) => {
  const masterProductCode = product.get('masterProductCode');
  const list = List();
  let layer = Map({});

  if (masterProductCode) {
    const code = product.get('code');
    layer = layer.set('prod_variant', list.push(`${code}_${masterProductCode}`));
  } else {
    layer = layer.set('prod_variant', list.push('master'));
  }
  return layer;
};

const getGiftPoints = (product) => {
  const giftPoints = product.getIn(['loyaltyProgram', 'type']);
  const list = List();
  let layer = Map({});

  if (giftPoints && giftPoints === 'ADDITIONAL_POINTS') {
    const points = list.push(Math.round(product.getIn('loyaltyProgram', 'value') * 10));
    layer = layer.set('prod_puntiomaggio', points);
  }
  return layer;
};

const getIdeapiuPoints = (product) => {
  const ideapiuPoints = product.getIn(['loyaltyProgram', 'type']);
  const list = List();
  let layer = Map({});

  if (ideapiuPoints && ideapiuPoints === 'DISCOUNT') {
    const points = list.push(Math.round(product.getIn('prod_idepiu', 'value') * 10));
    layer = layer.set('prod_idepiu', points);
  }
  return layer;
};

const getBundle = (product) => {
  const isBundle = product.getIn(['bundleInformation', 'isBundle']);
  const list = List();
  let layer = Map({ prod_bundle: list.push('0') });

  if (isBundle) {
    layer = layer.set('prod_bundle', list.push('1'));
  }
  return layer;
};

const getProdList = (product) => {
  const mainCategory = product.get('mainCategory');
  const mainCategoryName = product.get('mainCategoryName');
  return `${mainCategoryName}/${mainCategory}`;
};

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};


// ---------------------   EXPORTED FUNCTIONS ------------------->

const trimStartSlash = (text) => _.trimStart(text, '/');

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

const buildRelatedProductsLayer = (products = Map({})) => {
  let prodPositionCount = 0;

  if (products.size) {
    const listOfProductsLayer = products.map((product) => {
      const prodPosition = List().push(prodPositionCount += 1);
      const prodListList = List().push(getProdList(product));

      let productLayer = buildCommonLayer(product);
      // add additional properties to productLayer
      productLayer = productLayer.set('prod_position', prodPosition);
      productLayer = productLayer.set('prod_list', prodListList);
      return productLayer;
    });

    const mergedlistOfProductsLayer = listOfProductsLayer.reduce((acc, productLayer) => {
      const mergedValues = _.mergeWith(acc.toJS(), productLayer.toJS(), customizer);
      return Map(mergedValues);
    });

    const normalizeFinalLayer = mergedlistOfProductsLayer
                                .mapKeys(key => _.replace(key, 'prod', 'imp'));

    return normalizeFinalLayer;
  }
};

export {
  trimStartSlash,
  buildProductLayer,
  buildRelatedProductsLayer
};

