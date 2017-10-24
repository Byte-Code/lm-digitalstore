/* eslint-disable */
import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { requestFetchProducts, clearProductList } from '../actions/productListActions';
import * as filtersActions from '../actions/filtersActions';
import { getCatalogueProducts, getFilterMap,
  getDialogStatus, getCatalogueStocks } from '../reducers/selectors';
import { setAnalyticsProductClick, trackCatalogueProductsChunk } from '../actions/analyticsActions';

const mapStateToProps = (state, ownProps) => {
  const { params: { categoryCode } } = ownProps;
  return {
    categoryCode,
    filterMap: getFilterMap(state),
    products: getCatalogueProducts()(state, categoryCode),
    isDialogOpen: getDialogStatus(state),
    catalogueStocks: getCatalogueStocks(state)
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  clearProductList,
  setAnalyticsProductClick,
  trackCatalogueProductsChunk
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
