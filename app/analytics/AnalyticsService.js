import { Map } from 'immutable';
import uuid from 'uuid4';
import * as utils from './AnalyticsUtils';
import tealiumAnalytics from './tealiumAnalytics';

class AnalyticsService {

  constructor() {
    this.dataLayer = Map({});
    this.setPageName = this.setPageName.bind(this);
    this.setCid = this.setCid.bind(this);
    this.deleteInDataLayer = this.deleteInDataLayer.bind(this);
    this.setDataLayer = this.setDataLayer.bind(this);
    this.setStoreCode = this.setStoreCode.bind(this);
    this.track = this.track.bind(this);
    this.mergeInDataLayer = this.mergeInDataLayer.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setRelatedProduct = this.setRelatedProduct.bind(this);
  }

  setDataLayer(key, value) {
    this.dataLayer = this.dataLayer.set(key, value);
  }

  mergeInDataLayer(layer) {
    this.dataLayer = this.dataLayer.merge(layer);
  }

  setPageName(path) {
    const pageName = [];
    pageName.push(utils.trimStartSlash(path));
    this.setDataLayer('page_name', pageName);
  }

  setCid() {
    const cid = uuid();
    this.setDataLayer('cid', uuid.valid(cid));
  }

  deleteInDataLayer(actionType) {
    const map = {
      IDLE_TIMER_COMPLETE: 'cid'
    };
    this.dataLayer = this.dataLayer.delete(map[actionType]);
  }

  setStoreCode(storeCode) {
    this.setDataLayer('navigation_store', storeCode);
  }

  setProduct(product) {
    const productLayer = utils.buildProductLayer(product);
    this.mergeInDataLayer(productLayer);
    console.log(this.dataLayer.toJS());
  }

  setRelatedProduct(products) {
    const relatedProductsLayer = utils.buildRelatedProductsLayer(products);
    this.mergeInDataLayer(relatedProductsLayer);
  }

  track(eventType) {
    tealiumAnalytics([{
      hitType: eventType,
      dataLayer: this.dataLayer.toJS()
    }]);

    // change with logger
    console.log(this.dataLayer.toJS());
  }
}

export default new AnalyticsService();
