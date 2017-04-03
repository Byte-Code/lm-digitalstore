import { Range, List } from 'immutable';

export function titleFormatter(text) {
  return text.charAt(0) + text.slice(1).toLowerCase();
}

export function chunkItemList(itemList, chunkSize) {
  return Range(0, itemList.count(), chunkSize)
    .map(chunkStart => itemList.slice(chunkStart, chunkStart + chunkSize));
}

export function buildFilters(query) {
  const filters = query.facets ? List(query.filters.split(',')) : List();
  return filters.map(f => decodeURIComponent(f));
}
