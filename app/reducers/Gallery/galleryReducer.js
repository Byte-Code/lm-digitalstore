import { fromJS } from 'immutable';
import { SAVE_GALLERY_INDEX, CLEAR_GALLERY_INDEX } from '../../actions/actionTypes';

const initialState = fromJS({
  index: 0
});

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_GALLERY_INDEX:
      return state.set('index', action.index);
    case CLEAR_GALLERY_INDEX:
      return state.clear();
    default:
      return state;
  }
}
