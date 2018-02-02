import { SAVE_GALLERY_INDEX, CLEAR_GALLERY_INDEX } from './actionTypes';

export function saveGalleryIndex(index) {
  return ({ type: SAVE_GALLERY_INDEX, index });
}

export function clearGalleryIndex() {
  return ({ type: CLEAR_GALLERY_INDEX });
}
