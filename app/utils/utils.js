import { Range } from 'immutable';

export function titleFormatter(text) {
  return text.charAt(0) + text.slice(1).toLowerCase();
}

export function chunkItemList(itemList, chunkSize) {
  return Range(0, itemList.count(), chunkSize)
    .map(chunkStart => itemList.slice(chunkStart, chunkStart + chunkSize));
}

export function buildAid(query) {
  const aids = query.aids ? decodeURIComponent(query.aids) : '';
  return aids;
}
