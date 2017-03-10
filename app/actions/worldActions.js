import { fromJS } from 'immutable';
import fetch from '../../mocks/apiMock';
import * as actions from './actionTypes';

export const fetchWorld = () => (dispatch) => {
  dispatch({ type: actions.REQUEST_FETCH_WORLD });
  return fetch().then(
    (res) => {
      const immutableData = fromJS(res);
      return dispatch({ type: actions.SUCCESS_FETCH_WORLD, payload: { immutableData } });
    },
    (err) => {
      console.err(err);
      dispatch({ type: actions.FAILURE_FETCH_WORLD });
      throw new Error(err);
    }
  );
};
