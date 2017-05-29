import { fromJS, List } from 'immutable';
import * as actionTypes from '../../actions/actionTypes';

function toggleFilter(state, newFilter) {
  const filters = state.get('filters');
  if (filters.includes(newFilter)) {
    return filters.filterNot(f => f === newFilter);
  }
  return filters.push(newFilter);
}

function toggleAid(state, newAid) {
  return state.get('aid') === newAid ? '' : newAid;
}

function resetFilters(state) {
  return state.set('availability', false).set('filters', List()).set('aid', '');
}

const initialState = fromJS({
  availability: false,
  filters: [],
  aid: '',
  categoryCode: ''
});

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_AID:
      return state.set('aid', toggleAid(state, action.newAid));
    case actionTypes.TOGGLE_FILTER:
      return state.set('filters', toggleFilter(state, action.newFilter));
    case actionTypes.TOGGLE_AVAILABILITY:
      return state.set('availability', !state.get('availability'));
    case actionTypes.APPLY_FILTERS:
      return action.filterMap;
    case actionTypes.INIT_FILTERS:
      return initialState;
    case actionTypes.RESET_FILTERS:
      return resetFilters(state);
    case actionTypes.SUCCESS_FETCH_CATEGORY:
      return state.set('categoryCode', action.categoryCode);
    default:
      return state;
  }
}
