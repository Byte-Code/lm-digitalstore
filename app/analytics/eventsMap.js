import AnalyticsService from './AnalyticsService';
import * as actions from '../actions/actionTypes';

const pageView = () => ({
  hitType: 'view',
  dataLayer: AnalyticsService.getDataLayer()
});

const eventsMap = {
  '@@router/LOCATION_CHANGE': AnalyticsService.setPageName,
  [actions.SET_SESSION_CODE]: AnalyticsService.setCid,
  [actions.SET_STORE_CODE]: AnalyticsService.setStoreCode,
  [actions.TRACK_SESSION_START]: pageView,
  [actions.IDLE_TIMER_COMPLETE]: AnalyticsService.deleteInDataLayer
};

export default eventsMap;
