import { connect } from 'react-redux';

import Catalogue from '../components/Catalogue';
import { requestFetchCategory } from '../actions/categoryActions';
import { requestFetchProducts, clearProductList } from '../actions/productListActions';
import * as filtersActions from '../actions/filtersActions';
import {
  getCatalogueProducts, getFilterMap, getCategory, getDialogStatus,
  getRoutingData } from '../reducers/selectors';
import { setAnalyticsProductClick, trackCatalogueProductsChunk } from '../actions/analyticsActions';

const mapStateToProps = (state, ownProps) => {
  const { params: { categoryCode } } = ownProps;
  return {
    categoryInfo: getCategory(state, categoryCode),
    products: getCatalogueProducts()(state, categoryCode),
    filterMap: getFilterMap(state),
    isDialogOpen: getDialogStatus(state),
    routingData: getRoutingData(state)
  };
};

const mapDispatchToProps = {
  requestFetchCategory,
  requestFetchProducts,
  clearProductList,
  ...filtersActions,
  setAnalyticsProductClick,
  trackCatalogueProductsChunk
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue);
