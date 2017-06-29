/*eslint-disable */
import { Map, List } from 'immutable';
import { getPromotions, filterPromotions } from '../utils/marketingUtils';
import * as _ from 'lodash';

const productPropertiesMap = Map({
  'prod_id': ['code'],
  'prod_name': ['name'],
  'prod_brand': ['brand', 'name'],
  'prod_category': ['mainCategoryName'],
  'prod_univers': ['mainCategoryRooms', '0'],
  'prod_price': ['price', 'selling', 'gross'],
  'prod_avail_online': ['vendible'],
  'prod_avail_store': ['isClickCollectProduct'],
  'prod_gamma': ['gamma'],
  'prod_sconto': ['price', 'selling', 'discount']
});

const pushValueInList = (key, value, list) => {
  list = list.set(key, list.get(key).push(value));
};


const buildCommonLayer = (product) => {
  let productDataLayer = Map({});
  let list = List();
  const cloneMap = productPropertiesMap;

  cloneMap.filter( (property, key) => {
    const productProperty = product.hasIn(property) ? product.getIn(property) : 'null';
    const propertyValue = list.push(productProperty);
    productDataLayer = productDataLayer.set(key, propertyValue);
  });
  return productDataLayer;

};

const isProductNew = (product) => {
  const marketingAttributes = product.get('marketingAttributes');
  const loyaltyProgram = product.get('loyaltyProgram');
  let list = List();
  let isNew =  Map({ prod_new: list.push('0') });

  if(marketingAttributes && loyaltyProgram) {
    const promotions = getPromotions(marketingAttributes, loyaltyProgram);
    const filteredPromotions = filterPromotions(promotions);

    filteredPromotions.map( (promotion) => {
      const code = promotion.get('code');
      if(code === 'NOVITA') {
        isNew = isNew.set('prod_new', list.push('1'));
      }
    });
  }
  return isNew;
};

const getVariant = (product) => {
  const masterProductCode = product.get('masterProductCode');
  let list = List();
  let layer = Map({});

  if(masterProductCode) {
    const code = product.get('code');
    layer = layer.set('prod_variant', list.push(code + '_' + masterProductCode));
  } else {
    layer = layer.set('prod_variant', list.push('master'));
  }
  return layer;
};

const getGiftPoints = (product) => {
  const giftPoints = product.getIn(['loyaltyProgram', 'type']);
  let layer = Map({});
  let list = List();

  if(giftPoints && giftPoints === 'ADDITIONAL_POINTS') {
    const points = list.push(Math.round(product.getIn('loyaltyProgram', 'value') * 10));
    layer =  layer.set('prod_puntiomaggio', points);
  }
  return layer;
};

const getIdeapiuPoints = (product) => {
  const ideapiuPoints = product.getIn(['loyaltyProgram', 'type']);
  let layer = Map({});
  let list = List();

  if(ideapiuPoints && ideapiuPoints === 'DISCOUNT') {
    const points = list.push(Math.round(product.getIn('prod_idepiu', 'value') * 10));
    layer =  layer.set('prod_idepiu', points);
  }
  return layer;
};

const getBundle = (product) => {
  const isBundle = product.getIn(['bundleInformation', 'isBundle']);
  let list = List();
  let layer = Map({ prod_bundle: list.push('0')});

  if(isBundle) {
    layer = layer.set('prod_bundle', list.push('1'));
  }
  return layer;
};

const setPosition = (listLayer = Map({}), index = 0) => {
  if(index && listLayer.size) {
    listLayer = pushValueInList('imp_position', index, listLayer);
  }

  return listLayer;
};

const getProdList = (product) => {
  const mainCategory = product.get('mainCategory');
  const mainCategoryName = product.get('mainCategoryName');
  const prodList = mainCategoryName + '/' + mainCategory;
  return prodList
};

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
};


// ---------------------   EXPORTED FUNCTIONS ------------------->

const trimStartSlash = (text) => _.trimStart(text, '/');

const buildProductLayer = ( product = {} ) => {
  let productLayer = Map({});

  if(!_.isEmpty(product)) {
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

const buildRelatedProductsLayer = (products = Map({}), path = '/') => {
  let prodPositionCount = 0;
  let positionList = List();
  let prodList = List();

  //console.log(path);

  if(products.size) {
    const listOfProductsLayer = products.map((product) => {
      const prodPosition = positionList.push(prodPositionCount += 1);
      const prodListList = prodList.push(getProdList(product));

      let productLayer = buildCommonLayer(product);
      //add additional properties to productLayer
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

