import { Range, List } from 'immutable';

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

export function buildFilters(query) {
  const filters = query.filters ? List(query.filters.split(',')) : List();
  return filters.map(facet => decodeURIComponent(facet));
}
