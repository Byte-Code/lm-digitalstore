import { fromJS } from 'immutable';

import * as actions from '../../../app/actions/filtersActions';
import reducer, {
  toggleFilter,
  toggleAid,
  resetFilters
} from '../../../app/reducers/Filters/filtersReducer';

const initialFilters = fromJS({
  availability: false,
  filters: [],
  aid: '',
  categoryCode: ''
});

const initialState = fromJS({
  active: initialFilters,
  temp: initialFilters
});
const anyAction = { type: 'any' };

describe('toggleFilter', () => {
  it('should return a List with containing the new filter when the latter is not included in state.filters', () => {
    const expectedResult = fromJS(['filter0']);
    expect(toggleFilter(initialFilters, 'filter0')).toEqual(expectedResult);
  });

  it('should remove the filter if it is already present in state.filters', () => {
    const state = initialFilters.set('filters', fromJS(['filter0']));
    expect(toggleFilter(state, 'filter0')).toEqual(initialFilters.get('filters'));
  });
});

describe('toggleAid', () => {
  it('should return an empty string if newAid is already the selected one', () => {
    const state = initialFilters.set('aid', 'aid0');
    expect(toggleAid(state, 'aid0')).toEqual('');
  });

  it('should otherwise return the new aid', () => {
    expect(toggleAid(initialFilters, 'aid0')).toEqual('aid0');
    expect(toggleAid(initialFilters.set('aid', 'aid1'), 'aid0')).toEqual('aid0');
  });
});

describe('resetFilters', () => {
  it('should reset the filters except from categoryCode', () => {
    const state = fromJS({
      availability: true,
      filters: ['filter0'],
      aid: 'aid0',
      categoryCode: 'cat123'
    });
    const expectedResult = fromJS({
      availability: false,
      filters: [],
      aid: '',
      categoryCode: 'cat123'
    });
    expect(resetFilters(state)).toEqual(expectedResult);
  });
});

describe('filtersReducer', () => {
  it('should set the result of toggleAid in state.active.aid in case of TOGGLE_AID', () => {
    const expectedResult = initialState.setIn(
      ['active', 'aid'],
      toggleAid(initialState.get('active'), 'aid0')
    );
    expect(reducer(initialState, actions.toggleAid('aid0'))).toEqual(expectedResult);
  });

  it('should set the result of toggleAid in state.temp.aid in case of TOGGLE_TEMP_FILTER', () => {
    const expectedResult = initialState.setIn(
      ['temp', 'filters'],
      toggleAid(initialState.get('temp'), fromJS(['filter0']))
    );
    expect(reducer(initialState, actions.toggleTempFilter('filter0'))).toEqual(expectedResult);
  });

  it('should set the result of toggleFilter in state.active.filters in case of TOGGLE_FILTER', () => {
    const expectedResult = initialState.setIn(
      ['active', 'filters'],
      toggleFilter(initialState.get('active'), 'filter0')
    );
    expect(reducer(initialState, actions.toggleFilter('filter0'))).toEqual(expectedResult);
  });

  it('should negate the value of state.temp.availability in case of TOGGLE_TEMP_AVAILABILITY', () => {
    const expectedResult = initialState.setIn(['temp', 'availability'], true);
    expect(reducer(initialState, actions.toggleTempAvailability())).toEqual(expectedResult);
  });

  it('should negate the value of state.active.availability in case of TOGGLE_AVAILABILITY', () => {
    const expectedResult = initialState.setIn(['active', 'availability'], true);
    expect(reducer(initialState, actions.toggleAvailability())).toEqual(expectedResult);
  });

  it('should return initialState in case of INIT_FILTERS', () => {
    const state = fromJS({ content: 'any' });
    expect(reducer(state, actions.initFilters())).toEqual(initialState);
  });

  it('should set state.temp to state.active in case of INIT_TEMP_FILTERS', () => {
    const state = fromJS({ active: { content: 'active' }, temp: { temp: 'temp' } });
    const expectedResult = state.set('temp', state.get('active'));
    expect(reducer(state, actions.initTempFilters())).toEqual(expectedResult);
  });

  it('should set state.active to state.temp in case of APPLY_TEMP_FILTERS', () => {
    const state = fromJS({ active: { content: 'active' }, temp: { temp: 'temp' } });
    const expectedResult = state.set('active', state.get('temp'));
    expect(reducer(state, actions.applyTempFilters())).toEqual(expectedResult);
  });

  it('should set the result of resetFilters in state.active in case of RESET_FILTERS', () => {
    const state = initialState.setIn(
      ['active', 'filters'],
      toggleAid(initialState.get('active'), fromJS(['filter0']))
    );
    expect(reducer(state, actions.resetFilters())).toEqual(initialState);
  });

  it('should set the result of resetFilters in state.temp in case of RESET_TEMP_FILTERS', () => {
    const state = initialState.setIn(
      ['temp', 'filters'],
      toggleAid(initialState.get('temp'), fromJS(['filter0']))
    );
    expect(reducer(state, actions.resetTempFilters())).toEqual(initialState);
  });

  it('should return the current state in default case', () => {
    const state = fromJS({ content: 'currentState' });
    expect(reducer(state, anyAction)).toEqual(state);
  });
});
