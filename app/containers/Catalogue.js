/* eslint-disable */
import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { requestFetchProducts, clearProductList } from '../actions/productListActions';
import { saveGalleryIndex } from '../actions/galleryActions';
import { initFilters } from '../actions/filtersActions';
import { getCatalogueProducts, getFilterMap,
  getDialogStatus, getCatalogueStocks, getGalleryIndex } from '../reducers/selectors';
import { setAnalyticsProductClick,
  trackCatalogueProductsChunk,
  applyFilterInDataLayer } from '../actions/analyticsActions';

const mapStateToProps = (state, ownProps) => {
  const { params: { categoryCode } } = ownProps;
  return {
    categoryCode,
    filterMap: getFilterMap(state),
    products: getCatalogueProducts()(state, categoryCode),
    isDialogOpen: getDialogStatus(state),
    catalogueStocks: getCatalogueStocks(state),
    chunkIndex: getGalleryIndex(state)
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  clearProductList,
  setAnalyticsProductClick,
  trackCatalogueProductsChunk,
  saveGalleryIndex,
  applyFilterInDataLayer,
  initFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
