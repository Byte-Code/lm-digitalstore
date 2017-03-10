import fetch from '../../mocks/apiMock';
import * as actions from './actionTypes';

export const fetchWorld = () => (dispatch) => {
  dispatch({ type: actions.REQUEST_FETCH_WORLD });
  return fetch().then(
    (res) => {
      console.log(res);
      dispatch({ type: actions.SUCCESS_FETCH_WORLD });
      return res;
    },
    (err) => {
      console.err(err);
      dispatch({ type: actions.FAILURE_FETCH_WORLD });
      throw new Error(err);
    }
  );
};
