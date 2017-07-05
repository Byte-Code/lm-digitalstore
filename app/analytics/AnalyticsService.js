import { Map } from 'immutable';
import uuid from 'uuid4';
import * as utils from './AnalyticsUtils';
import tealiumAnalytics from './tealiumAnalytics';

class AnalyticsService {

  constructor() {
    this.dataLayer = Map({});
    this.state = {};
    this.firstTrack = true;
    this.setPageName = this.setPageName.bind(this);
    this.setCid = this.setCid.bind(this);
    this.deleteInDataLayer = this.deleteInDataLayer.bind(this);
    this.setDataLayer = this.setDataLayer.bind(this);
    this.setNavigationStore = this.setNavigationStore.bind(this);
    this.track = this.track.bind(this);
    this.mergeInDataLayer = this.mergeInDataLayer.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setRelatedProduct = this.setRelatedProduct.bind(this);
    this.clearDataLayer = this.clearDataLayer.bind(this);
    this.setReleaseVersion = this.setReleaseVersion.bind(this);
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
    const map = {
      IDLE_TIMER_COMPLETE: 'cid'
    };
    this.dataLayer = this.dataLayer.delete(map[actionType]);
  }

  setNavigationStore(storeCode) {
    const navigationStoreLayer = utils.buildNavigationStore(storeCode);
    this.mergeInDataLayer(navigationStoreLayer);
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

  setReleaseVersion(worldName = '') {
    if (worldName) {
      const releseVersion = utils.buildReleaseVersion(worldName);
      this.setDataLayer('app_release_version', releseVersion);
    }
  }

  track(eventType) {
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
