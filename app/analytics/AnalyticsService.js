import { Map } from 'immutable';
import uuid from 'uuid4';
import * as utils from './AnalyticsUtils';
import tealiumAnalytics from './tealiumAnalytics';
import { PROD_ACTION_DEDAIL, PROD_CLICK } from '../actions/actionTypes';

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
    this.setNavigationStore = this.setNavigationStore.bind(this);
    this.track = this.track.bind(this);
    this.mergeInDataLayer = this.mergeInDataLayer.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.setRelatedProduct = this.setRelatedProduct.bind(this);
    this.clearDataLayer = this.clearDataLayer.bind(this);
    this.setReleaseVersion = this.setReleaseVersion.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.setStoreAvailability = this.setStoreAvailability.bind(this);
  }

  setDataLayer(key, value) {
    this.dataLayer = this.dataLayer.set(key, value);
  }

  clearDataLayer() {
    // eslint-disable-next-line array-callback-return
    this.dataLayer = this.dataLayer.filter((value, key) => {
      const validKeys = ['cid', 'navigation_store', 'page_name', 'app_release_version'];
      if (validKeys.indexOf(key) > -1) {
        return value;
      }
    });
  }

  mergeInDataLayer(layer) {
    this.dataLayer = this.dataLayer.merge(layer);
  }

  setPageName(type, data) {
    const pageName = this.dataLayer.get('page_name');
    this.setDataLayer('page_name', utils.buildPageName(type, data, pageName));
  }

  setCid() {
    const cid = uuid();
    this.setDataLayer('cid', uuid.valid(cid));
  }

  deleteInDataLayer(actionType) {
    const map = { IDLE_TIMER_COMPLETE: 'cid' };
    this.dataLayer = this.dataLayer.delete(map[actionType]);
  }

  setNavigationStore(storeCode) {
    const navigationStoreLayer = utils.buildNavigationStore(storeCode);
    this.mergeInDataLayer(navigationStoreLayer);
  }

  setProduct(data) {
    const {
      product = Map({}),
      action = PROD_ACTION_DEDAIL,
      index = 0,
      pathArray
      } = data;

    let productLayer = utils.buildProductLayer(product, action);

    if (action === PROD_CLICK) {
      let position = index;
      productLayer = utils.normalizeProductClickLayer(
        productLayer,
        position += 1,
        product,
        pathArray
      );
    }
    this.mergeInDataLayer(productLayer);
  }

  setRelatedProduct(data) {
    const relatedProductsLayer = utils.buildRelatedProductsLayer(data);
    this.mergeInDataLayer(relatedProductsLayer);
  }

  setReleaseVersion(worldName = '') {
    if (worldName) {
      const releseVersion = utils.buildReleaseVersion(worldName);
      this.setDataLayer('app_release_version', releseVersion);
    }
  }

  setFilters(filtersData) {
    const filtersLayer = utils.buildActiveFilters(filtersData);
    this.mergeInDataLayer(filtersLayer);
  }

  clearFilters(productsNumber) {
    this.dataLayer = utils.clearFilters(this.dataLayer, productsNumber);
  }

  setStoreAvailability({ storeName = '', storeStock = '', product = Map({}) }) {
    const { prodCode, prodCategory } = utils.getProductProperty(product);
    this.setDataLayer('event_type', 'product_condivisione');
    this.setDataLayer('prod_id', prodCode);
    this.setDataLayer('prod_category', prodCategory);
    this.setDataLayer('event_action', `${storeName}_${storeStock}`);
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
      }, 500);

      console.log(this.dataLayer.toJS());
    }

    this.clearDataLayer();
  }
}

export default new AnalyticsService();
