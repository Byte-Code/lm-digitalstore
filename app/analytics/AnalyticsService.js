import { Map } from 'immutable';
import uuid from 'uuid4';
import * as utils from './AnalyticsUtils';
import tealiumAnalytics from './tealiumAnalytics';

class AnalyticsService {

  constructor() {
    this.dataLayer = Map({});
    this.state = {};
    this.firstTrack = true;
    this.aidFilterTemp = Map({});
    this.setPageName = this.setPageName.bind(this);
    this.setCid = this.setCid.bind(this);
    this.deleteInDataLayer = this.deleteInDataLayer.bind(this);
    this.setDataLayer = this.setDataLayer.bind(this);
    this.setStoreCode = this.setStoreCode.bind(this);
    this.track = this.track.bind(this);
    this.mergeInDataLayer = this.mergeInDataLayer.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setRelatedProduct = this.setRelatedProduct.bind(this);
    this.setState = this.setState.bind(this);
    this.clearDataLayer = this.clearDataLayer.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  setState(state) {
    this.state = state;
  }

  setDataLayer(key, value) {
    this.dataLayer = this.dataLayer.set(key, value);
  }

  clearDataLayer() {
    // eslint-disable-next-line array-callback-return
    this.dataLayer = this.dataLayer.filter((value, key) => {
      const validKeys = ['cid', 'navigation_store', 'page_name'];
      if (validKeys.indexOf(key) > -1) {
        return value;
      }
    });
  }

  mergeInDataLayer(layer) {
    this.dataLayer = this.dataLayer.merge(layer);
  }

  setPageName(path) {
    this.setDataLayer('page_name', utils.buildPageName(path));
  }

  setCid() {
    const cid = uuid();
    this.setDataLayer('cid', uuid.valid(cid));
  }

  deleteInDataLayer(actionType) {
    const map = { IDLE_TIMER_COMPLETE: 'cid' };
    this.dataLayer = this.dataLayer.delete(map[actionType]);
  }

  setStoreCode(storeCode) {
    this.mergeInDataLayer({ navigation_store: storeCode });
  }

  setProduct(product) {
    const productLayer = utils.buildProductLayer(product);
    this.mergeInDataLayer(productLayer);
  }

  setRelatedProduct(products) {
    const path = this.dataLayer.get('page_name');
    const relatedProductsLayer = utils.buildRelatedProductsLayer(products, path);
    this.mergeInDataLayer(relatedProductsLayer);
  }

  setFilters(filtersData) {
    const filtersLayer = utils.buildActiveFilters(filtersData);
    this.mergeInDataLayer(filtersLayer);
  }

  clearFilters(productsNumber) {
    this.dataLayer = utils.clearFilters(this.dataLayer, productsNumber);
  }

  track(eventType) {
    // hammer
    const storeCode = this.state.get('storeCodeReducer');
    this.mergeInDataLayer(Map({ navigation_store: storeCode }));

    if (this.firstTrack) {
      tealiumAnalytics([{
        hitType: eventType,
        dataLayer: this.dataLayer.toJS()
      }]);
      this.firstTrack = false;
      setTimeout(() => {
        this.firstTrack = true;
      }, 1000);

      console.log(this.dataLayer.toJS());
    }

    this.clearDataLayer();
  }
}

export default new AnalyticsService();
