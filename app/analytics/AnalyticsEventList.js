import * as constants from '../actions/actionTypes';

const analyticsEventList = [
  constants.SUCCESS_FETCH_WORLD,
  constants.IDLE_TIMER_COMPLETE,
  constants.START_ANALYTICS_SESSION,
  constants.SUCCESS_FETCH_PRODUCT,
  constants.SUCCESS_FETCH_PRODUCTLIST,
  constants.START_ANALYTICS_PRODUCT,
  constants.TOGGLE_AID,
  constants.APPLY_TEMP_FILTERS,
  constants.TOGGLE_AVAILABILITY,
  constants.TOGGLE_FILTER,
  constants.RESET_FILTERS,
  constants.TRACK_ANALYTICS_FILTERS,
  constants.SET_ANALYTICS_PRODUCT_CLICK,
  constants.TRACK_PRODUCT_CLICK,
  constants.TRACK_STORE_AVAILABILITY_EVENT
];

export default analyticsEventList;
