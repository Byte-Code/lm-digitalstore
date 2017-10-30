import { Map } from 'immutable';
import uuid from 'uuid4';
import * as utils from './AnalyticsUtils';
import tealiumAnalytics from './tealiumAnalytics';
import { PROD_ACTION_DEDAIL, PROD_CLICK } from '../actions/actionTypes';
import { isAnalyticsLogMode } from '../CommandLineOptions';
import { LABEL, PRODUCT_DISPONIBILITA } from './AnalyticsConstants';


class AnalyticsService {

  constructor() {
    this.dataLayer = Map({});
    this.state = {};
    this.timeout = true;
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
      const validKeys = [LABEL.CID, LABEL.NAVIGATION_STORE, LABEL.PAGE_NAME,
        LABEL.APP_RELEASE_VERSION];
      if (validKeys.indexOf(key) > -1) {
        return value;
      }
    });
  }

  mergeInDataLayer(layer) {
    this.dataLayer = this.dataLayer.merge(layer);
  }

  setPageName(type, data) {
    const pageName = this.dataLayer.get(LABEL.PAGE_NAME);
    this.setDataLayer(LABEL.PAGE_NAME, utils.buildPageName(type, data, pageName));
  }

  setCid() {
    const cid = uuid();
    this.setDataLayer(LABEL.CID, uuid.valid(cid));
  }

  deleteInDataLayer(actionType) {
    const map = { IDLE_TIMER_COMPLETE: LABEL.CID };
    this.dataLayer = this.dataLayer.delete(map[actionType]);
  }

  setNavigationStore(navigationStore) {
    const navigationStoreLayer = utils.buildNavigationStore(navigationStore);
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
      this.setDataLayer(LABEL.APP_RELEASE_VERSION, releseVersion);
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
    this.setDataLayer(LABEL.EVENT_TYPE, PRODUCT_DISPONIBILITA);
    this.setDataLayer(LABEL.PROD_ID, prodCode);
    this.setDataLayer(LABEL.PROD_CATEGORY, prodCategory);
    this.setDataLayer(LABEL.EVENT_ACTION, `${storeName}_${storeStock}`);
  }

  track(eventType, clear = true) {
    if (this.timeout) {
      tealiumAnalytics([{
        hitType: eventType,
        dataLayer: this.dataLayer.toJS()
      }]);

      if (isAnalyticsLogMode || process.env.NODE_ENV === 'development') {
        console.log(this.dataLayer.toJS());
      }

      if (clear) {
        this.clearDataLayer();
      }
      setTimeout(() => { this.timeout = true; }, 500);
    }
  }
}

export default new AnalyticsService();
