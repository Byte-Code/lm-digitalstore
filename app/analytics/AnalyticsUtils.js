/*eslint-disable */
import { Map, List } from 'immutable';
import trimStart from 'lodash/trimStart';
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


const buildCommonLayer = (product) => {
  let productDataLayer = Map({});
  let list = List();

  productPropertiesMap.filter( (property, key) => {
    if(product.hasIn(property)) {
      const propertyValue = list.push(product.getIn(property));
      productDataLayer = productDataLayer.set(key, propertyValue);
    }

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


// ---------------------   EXPORTED FUNCTIONS ------------------->

const trimStartSlash = (text) => trimStart(text, '/');

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

const buildRelatedProductsLayer = (products) => {
  products.filter( (product, key) => {
    //console.log(product.toJS());
  });
};

export {
  trimStartSlash,
  buildProductLayer,
  buildRelatedProductsLayer
};

