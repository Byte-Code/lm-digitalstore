import { Map } from 'immutable';
import { expectSaga } from 'redux-saga-test-plan';
import * as action from '../../app/actions/actionTypes';
import { callAnalyticsSession } from '../../app/sagas/analyticsSaga';
import { getCategoryData, getPageNameData } from '../../app/sagas/analyticsSaga.utility';
import * as selectors from '../../app/reducers/selectors';

jest.mock('../../app/analytics/AnalyticsService');
const AnalyticsService = require('../../app/analytics/AnalyticsService');

jest.mock('../../app/CommandLineOptions', () => ({
  isDebugMode: jest.fn()
}));

describe('Test one by one all race conditions', () => {
  describe('IDLE_TIMER_COMPLETE event', () => {
    const returnRaceValue = { keyRace: 'idleTimerComplete', dataRace: { type: 'prova' } };

    it('should PUT SUCCESS_DELETE_IN_DATALAYER at the End', () =>
      expectSaga(callAnalyticsSession)
        .provide(new DefaultProvider(returnRaceValue).getProvider())
        .call.fn(getPageNameData, {})
        .call.fn(AnalyticsService.deleteInDataLayer)
        .put({ type: action.SUCCESS_DELETE_IN_DATALAYER })
        .run());
  });

  describe('START_ANALYTICS_SESSION event', () => {
    const returnRaceValue = { keyRace: 'startAnalyticsSession' };

    it('should PUT SUCCESS_START_ANALYTICS_SESSION at the End', () =>
      expectSaga(callAnalyticsSession)
        .provide(new DefaultProvider(returnRaceValue).getProvider())
        .call.fn(AnalyticsService.track)
        .put({ type: action.SUCCESS_START_ANALYTICS_SESSION })
        .run());
  });

  describe('SUCCESS_FETCH_PRODUCT event', () => {
    it('should PUT SUCCESS_SET_PRODUCT_IN_DATALAYER at the End', () => {
      const fakeProduct = { result: Map({ code: 'ewfwf', name: 'Filippo' }) };
      const returnRaceValue = { keyRace: 'setProduct', dataRace: fakeProduct };

      return expectSaga(callAnalyticsSession)
        .provide(new DefaultProvider(returnRaceValue).getProvider())
        .call.fn(AnalyticsService.setPageName)
        .call.fn(AnalyticsService.setProduct)
        .put({ type: action.SUCCESS_SET_PRODUCT_IN_DATALAYER })
        .run();
    });
  });

  describe('SUCCESS_FETCH_PRODUCTLIST event', () => {
    const fakeProductList = {
      result: [
        Map({ code: 'code1', name: 'Product1' }),
        Map({ code: 'code2', name: 'Product2' })
      ]
    };
    let notCataloguePage = null;
    let cataloguePage = null;

    it('should PUT SUCCESS_SET_RELATED_PRODUCT_IN_DATALAYER at the End', () => {
      notCataloguePage = expectSaga(callAnalyticsSession)
        .provide({
          call(effect, next) {
            if (effect.fn === getPageNameData) {
              return { worldName: 'fakeWorld', pathArray: ['home'] };
            }
            if (effect.fn === getCategoryData) {
              return { categoryCode: '', categoryName: '', worldName: '' };
            }
            return next();
          },
          race: () => ({ setRelatedProduct: fakeProductList })
        })
        .not.call.fn(AnalyticsService.setPageName)
        .call.fn(AnalyticsService.setRelatedProduct)
        .put({ type: action.SUCCESS_SET_RELATED_PRODUCT_IN_DATALAYER })
        .run();
    });

    it('should PUT SUCCESS_SET_PAGENAME before SUCCESS_SET_RELATED_PRODUCT_IN_DATALAYER', () => {
      cataloguePage = expectSaga(callAnalyticsSession)
        .provide({
          call(effect, next) {
            if (effect.fn === getPageNameData) {
              return { worldName: 'fakeWorld', pathArray: ['catalogue'] };
            }
            if (effect.fn === getCategoryData) {
              return { categoryCode: '', categoryName: '', worldName: '' };
            }
            return next();
          },
          race: () => ({ setRelatedProduct: fakeProductList })
        })
        .call.fn(AnalyticsService.setPageName)
        .call.fn(AnalyticsService.setRelatedProduct)
        .put({ type: 'SUCCESS_SET_PAGENAME' })
        .put({ type: action.SUCCESS_SET_RELATED_PRODUCT_IN_DATALAYER })
        .run();
    });

    return Promise.all([notCataloguePage, cataloguePage]);
  });

  describe('START_ANALYTICS_PRODUCT event', () => {
    const returnRaceValue = { keyRace: 'startAnalyticsProduct' };

    it('should PUT SUCCESS_START_ANALYTICS_PRODUCT at the End', () =>
      expectSaga(callAnalyticsSession)
        .provide(new DefaultProvider(returnRaceValue).getProvider())
        .call.fn(AnalyticsService.track)
        .put({ type: action.SUCCESS_START_ANALYTICS_PRODUCT })
        .run());
  });

  describe('TRACK_ANALYTICS_FILTERS events', () => {
    const returnRaceValue = { keyRace: 'trackFilters' };

    it('should PUT SUCCESS_TRACK_FILTERS at the End', () =>
      expectSaga(callAnalyticsSession)
        .provide(new DefaultProvider(returnRaceValue).getProvider())
        .call.fn(AnalyticsService.track)
        .put({ type: action.SUCCESS_TRACK_FILTERS })
        .run());
  });

  describe('TRACK_PRODUCT_CLICK event', () => {
    const returnRaceValue = { keyRace: 'trackProductClick' };

    it('should PUT SUCCESS_TRACK_PRODUCT_CLICK at the End', () =>
      expectSaga(callAnalyticsSession)
        .provide(new DefaultProvider(returnRaceValue).getProvider())
        .call.fn(AnalyticsService.track)
        .put({ type: action.SUCCESS_TRACK_PRODUCT_CLICK })
        .run());
  });

  describe('SET_ANALYTICS_PRODUCT_CLICK event', () => {
    const returnRaceValue = {
      keyRace: 'productClick',
      dataRace: {
        data: {
          product: 'product',
          index: 1
        }
      }
    };

    it('should PUT TRACK_PRODUCT_CLICK at the End', () =>
      expectSaga(callAnalyticsSession)
        .provide(new DefaultProvider(returnRaceValue).getProvider())
        .call.fn(AnalyticsService.setProduct)
        .put({ type: action.TRACK_PRODUCT_CLICK })
        .run());
  });

  describe('TRACK_STORE_AVAILABILITY_EVENT event', () => {
    it('should PUT SUCCESS_TRACK_AVAILABILITY_BUTTON at the End', () =>
      expectSaga(callAnalyticsSession)
        .provide({
          call(effect, next) {
            if (effect.fn === getPageNameData) {
              return {};
            }
            return next();
          },
          select({ selector }, next) {
            if (selector === selectors.getProductReducer) {
              return 'prodotto';
            }
            return next();
          },
          race: () => ({ trackStoreAvailability: { storeData: {} } })
        })
        .call.fn(AnalyticsService.setStoreAvailability)
        .call.fn(AnalyticsService.track)
        .put({ type: action.SUCCESS_TRACK_AVAILABILITY_BUTTON })
        .run());
  });
});

class DefaultProvider {
  constructor({ keyRace = '', dataRace = true }) {
    this.race = { keyRace, dataRace };
    this.getProvider = this.getProvider.bind(this);
  }

  getProvider({ keyRace, dataRace } = this.race) {
    return {
      call(effect, next) {
        if (effect.fn === getPageNameData) {
          return {};
        }
        return next();
      },
      race: () => ({ [keyRace]: dataRace })
    };
  }
}
