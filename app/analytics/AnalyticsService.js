import { Map } from 'immutable';
import uuid from 'uuid4';
import * as utils from './AnalyticsUtils';

class AnalyticsService {

  constructor() {
    this.dataLayer = Map({});
    this.setPageName = this.setPageName.bind(this);
    this.setCid = this.setCid.bind(this);
    this.setDataLayer = this.setDataLayer.bind(this);
    this.setStoreCode = this.setStoreCode.bind(this);
    this.getDataLayer = this.getDataLayer.bind(this);
  }

  setDataLayer(key, value) {
    this.dataLayer = this.dataLayer.set(key, value);
  }

  setPageName(action) {
    const pageName = [];
    pageName.push(utils.trimStartSlash(action.payload.path));
    this.setDataLayer('page_name', pageName);
  }

  setCid() {
    const cid = uuid();
    this.setDataLayer('cid', uuid.valid(cid));
  }

  setStoreCode(action) {
    const { storeCode } = action;
    this.setDataLayer('navigation_store', storeCode);
  }

  getDataLayer() {
    return this.dataLayer.toJS();
  }

}

export default new AnalyticsService();
