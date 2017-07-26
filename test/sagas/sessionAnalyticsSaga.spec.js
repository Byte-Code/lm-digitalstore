import * as m from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import { setAnalyticsSession } from '../../app/sagas/sessionAnalyticsSaga';
import { START_ANALYTICS_SESSION } from '../../app/actions/actionTypes';
import { getPageNameData } from '../../app/sagas/analyticsSaga.utility';
import { getStore } from '../../app/reducers/selectors';
import AnaliticsService from '../../app/analytics/AnalyticsService';

jest.mock('../../app/CommandLineOptions', () => ({
  isDebugMode: jest.fn()
}));

describe('Test Analytics calls with SUCCESS_FETCH_WORLD event', () => {
  let inWorldPageTest = null;
  let notInWorldPageTest = null;

  it('should PUT START_ANALYTICS_SESSION in world page', () => {
    const getPageNameDataReturnValue = { worldName: 'worldTest', pathArray: ['world'] };

    inWorldPageTest = expectSaga(setAnalyticsSession)
      .provide([
        [m.call.fn(getPageNameData, ''), getPageNameDataReturnValue],
        [m.select.selector(getStore), {}]
      ])
      .call.fn(AnaliticsService.setPageName)
      .call.fn(AnaliticsService.setNavigationStore)
      .call.fn(AnaliticsService.setCid)
      .call.fn(AnaliticsService.setReleaseVersion)
      .put({ type: START_ANALYTICS_SESSION })
      .run();
  });

  it('should not PUT START_ANALYTICS_SESSION outside world page', () => {
    const getPageNameDataReturnValue = { worldName: 'worldTest', pathArray: ['home'] };

    notInWorldPageTest = expectSaga(setAnalyticsSession)
      .provide([
        [m.call.fn(getPageNameData, ''), getPageNameDataReturnValue],
        [m.select.selector(getStore), {}]
      ])
      .not.call.fn(AnaliticsService.setPageName)
      .not.call.fn(AnaliticsService.setNavigationStore)
      .not.call.fn(AnaliticsService.setCid)
      .not.call.fn(AnaliticsService.setReleaseVersion)
      .not.put({ type: START_ANALYTICS_SESSION })
      .run();
  });

  return Promise.all([inWorldPageTest, notInWorldPageTest]);
});
